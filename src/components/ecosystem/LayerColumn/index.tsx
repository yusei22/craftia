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
import { useRecoilState } from 'recoil';
import { LayerPanelWrapper } from './LayerPanelWrapper';
import { searchSpriteFromID } from 'application/sprites/Sprite';

import { spriteTreeAtom, useSpriteTreeHistPresentVal, useSpriteTreeSaver } from 'dataflow';
import { useGetSpriteTreeSync } from 'hooks/sprites/useGetSpriteTreeSync';

export const LayerColumn = () => {
    const getSpriteTreeSync = useGetSpriteTreeSync();
    const [spriteTree, setSpriteTree] = useRecoilState(spriteTreeAtom);
    //const spriteTreeHistPresent = useSpriteTreeHistPresentVal();
    const saveSpriteTree = useSpriteTreeSaver();

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over?.id) {
            return;
        }

        if (active.id !== over.id) {
            const sprites = getSpriteTreeSync();

            const [, oldIndex] = searchSpriteFromID(sprites, active.id.toString());
            const [, newIndex] = searchSpriteFromID(sprites, over.id.toString());

            if (oldIndex !== null && newIndex !== null) {
                const resultTree = arrayMove(sprites, oldIndex, newIndex);
                setSpriteTree(resultTree);
                saveSpriteTree();
            }
        }
    }
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
                items={spriteTree.map((sprite) => sprite.prefs.id).reverse()}
                strategy={verticalListSortingStrategy}
            >
                {spriteTree
                    .map((sprite) => (
                        <LayerPanelWrapper
                            id={sprite.prefs.id}
                            sprite={sprite}
                            key={sprite.prefs.id}
                        />
                    ))
                    .reverse()}
            </SortableContext>
        </DndContext>
    );
};
