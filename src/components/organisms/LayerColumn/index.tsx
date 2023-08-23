import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSetRecoilState } from 'recoil';
import { SortableLayerPanel } from './SortableLayerPanel';
import { getLayerIndexFromID } from 'application/layers/layer-tree/layer-tree-management/getLayerIndex';
import { layerTreeUndoRedo, layerTreeState } from 'stores/LayerTree';

const LayerColumn = () => {
  const setLayerTree = useSetRecoilState(layerTreeState);
  const saveHistory = layerTreeUndoRedo.useSaver();
  const history = layerTreeUndoRedo.useCurrentValue();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  async function handleDragEnd(event: DragEndEvent) {
    const createCtx2D = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      return ctx;
    };
    const { active, over } = event;
    if (!over?.id) return;

    if (active.id !== over.id) {
      const oldIndex = getLayerIndexFromID(history, active.id.toString());
      const newIndex = getLayerIndexFromID(history, over.id.toString());

      if (oldIndex !== null && newIndex !== null) {
        const resultTree = arrayMove(history, oldIndex, newIndex);
        setLayerTree(resultTree);
        await saveHistory(createCtx2D, resultTree);
      }
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={history} strategy={verticalListSortingStrategy}>
        {history.map((layerInfo) => (
          <SortableLayerPanel id={layerInfo.id} layer={layerInfo.layer} key={layerInfo.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export { LayerColumn };
