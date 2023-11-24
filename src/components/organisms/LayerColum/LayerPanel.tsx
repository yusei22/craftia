import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import Wrapper from 'components/layout/Wrapper';
import { LayerPanelContents } from 'components/organisms/LayerColum/LayerPanelContents';

export const LayerPanel = <T extends SpritePrefs>({
    id,
    sprite,
    className,
}: {
    id: string;
    sprite: Sprite<T>;
    className?: string;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Wrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <LayerPanelContents sprite={sprite} className={className} />
        </Wrapper>
    );
};
