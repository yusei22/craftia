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
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useRecoilState } from 'recoil';
import { LayerPanel } from '../LayerPanel';
import { searchSpriteFromID } from 'application/sprites/Sprite';

import Container from 'components/layout/Container';
import {
    spriteTreeAtom,
    useSpriteHistPresentValSyncReader,
    useSpriteTreeHistPresentVal,
    useSpriteTreeSaver,
} from 'dataflow';

export type LayerColumProps = {
    className?: string;
};

const LayerColumn = ({ className }: LayerColumProps) => {
    const [, setSpriteTree] = useRecoilState(spriteTreeAtom);
    const getSpriteTreeHistPresentSync = useSpriteHistPresentValSyncReader();
    const spriteTreeHistPresent = useSpriteTreeHistPresentVal();
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
            const sprites = getSpriteTreeHistPresentSync();

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
        <Container
            className={className}
            css={{
                width: '100%',
                flexFlow: 'column',
                justifyContent: 'start',
                alignItems: 'start',
            }}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={spriteTreeHistPresent.map((sprite) => sprite.prefs.id).reverse()}
                    strategy={verticalListSortingStrategy}
                >
                    {spriteTreeHistPresent
                        .map((sprite) => (
                            <LayerPanel
                                id={sprite.prefs.id}
                                sprite={sprite}
                                key={sprite.prefs.id}
                                css={{
                                    minWidth: '200px',
                                }}
                            />
                        ))
                        .reverse()}
                </SortableContext>
            </DndContext>
        </Container>
    );
};

export default LayerColumn;
