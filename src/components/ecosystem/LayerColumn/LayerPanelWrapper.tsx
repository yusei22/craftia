import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Sprite } from 'application/sprites/Sprite';
import Wrapper from 'components/layout/Wrapper';
import { LayerPanel } from 'components/organisms/LayerPanel';

export const LayerPanelWrapper = ({ id, sprite }: { id: string; sprite: Sprite }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Wrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <LayerPanel sprite={sprite} />
        </Wrapper>
    );
};
