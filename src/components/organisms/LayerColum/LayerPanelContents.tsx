import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useRecoilState } from 'recoil';
import { LayerPreview } from './LayerPreview';
import { LayerVisibility } from './LayerVisibility';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import { CheckerBoard } from 'components/atoms/CheckerBoard';
import IconButton from 'components/atoms/IconButton';
import Typography from 'components/atoms/Typography';
import Container from 'components/layout/Container';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';

type LayerPanelProps<T extends SpritePrefs> = {
    sprite: Sprite<T>;
    className?: string;
};

export const LayerPanelContents = <T extends SpritePrefs>({
    sprite,
    className,
}: LayerPanelProps<T>) => {
    const [activeSpriteIds, setActiveSpriteIds] = useRecoilState(activeSpriteIdsAtom);

    const onclick = () => {
        setActiveSpriteIds([sprite.prefs.id]);
    };

    return (
        <>
            <Container
                css={(theme) => ({
                    justifyContent: 'space-between',
                    backgroundColor: activeSpriteIds.includes(sprite.prefs.id)
                        ? theme.colors.primary300
                        : theme.colors.primary200,
                    padding: '3px 10px',
                    margin: '5px 0px',
                })}
                className={className}
                onClick={onclick}
            >
                <Container
                    css={{
                        justifyContent: 'start',
                    }}
                >
                    <IconButton
                        variant="translucent"
                        css={(theme) => ({
                            borderRadius: '10%',
                            fontSize: theme.fontSize.sm,
                            padding: 2,
                        })}
                    >
                        <DragIndicatorIcon />
                    </IconButton>
                    <CheckerBoard>
                        <LayerPreview sprite={sprite} width={45} height={40} />
                    </CheckerBoard>
                    <Typography variant="small" css={(theme) => ({ color: theme.colors.text })}>
                        {sprite.prefs.name}
                    </Typography>
                </Container>
                <LayerVisibility sprite={sprite} />
            </Container>
        </>
    );
};
