import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import { LayerName } from './Name';
import { LayerPreview } from './Preview';
import { LayerVisibility } from './Visibility';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';

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

    const [activeSpriteIds, setActiveSpriteIds] = useRecoilState(activeSpriteIdsAtom);

    const onclick = () => {
        setActiveSpriteIds([sprite.prefs.id]);
    };

    return (
        <>
            <Wrapper
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                css={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Container
                    css={(theme) => ({
                        justifyContent: 'space-between',
                        backgroundColor: activeSpriteIds.includes(sprite.prefs.id)
                            ? theme.colors.neutral300
                            : theme.colors.neutral200,
                        padding: '5px 10px',
                        width: '100%',
                        height: '100%',
                    })}
                    className={className}
                    onClick={onclick}
                >
                    <Container
                        css={{
                            justifyContent: 'start',
                        }}
                    >
                        <LayerPreview sprite={sprite} maxWidth={25} maxHeight={25} />
                        <LayerName sprite={sprite} />
                    </Container>
                    <LayerVisibility sprite={sprite} />
                </Container>
            </Wrapper>
        </>
    );
};
