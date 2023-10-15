import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MouseEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Sprite, searchSpriteFromID } from 'application/sprites/Sprite';
import IconButton from 'components/atoms/IconButton';
import Typography from 'components/atoms/Typography';
import Container from 'components/layout/Container';
import { spriteTreeAtom } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useGetSpriteTreeSync } from 'hooks/sprites/useGetSpriteTreeSync';

type LayerPanelProps = {
    sprite: Sprite;
};

export const LayerPanel = ({ sprite }: LayerPanelProps) => {
    const getSpriteTreeSync = useGetSpriteTreeSync();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const [activeSpriteIds, setActiveSpriteIds] = useRecoilState(activeSpriteIdsAtom);

    const onVisibilityClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        const sprites = getSpriteTreeSync();
        const [, index] = searchSpriteFromID(sprites, sprite.prefs.id);

        if (index !== null) {
            setSpriteTree((culVal) => {
                const newTree = [...culVal];
                newTree[index] = sprite.setPrefs((culPrefs) => ({
                    ...culPrefs,
                    visible: !culPrefs.visible,
                }));
                return newTree;
            });
        }
    };
    const onclick = () => {
        setActiveSpriteIds([sprite.prefs.id]);
    };

    return (
        <>
            <Container
                css={(theme) => ({
                    justifyContent: 'space-between',
                    backgroundColor: activeSpriteIds.includes(sprite.prefs.id)
                        ? theme.colors.neutralBright
                        : theme.colors.neutralBrighter,
                    padding: '4px 16px',
                    margin: '5px 10px',
                    borderRadius: '5px',
                })}
                onClick={onclick}
            >
                <IconButton
                    variant="translucent"
                    css={(theme) => ({
                        borderRadius: '10%',
                        marginRight: '10px',
                        fontSize: theme.fontSize.sm,
                    })}
                >
                    <DragIndicatorIcon />
                </IconButton>
                <Typography variant="small" css={(theme) => ({ color: theme.colors.text })}>
                    {sprite.prefs.name}
                </Typography>
                <IconButton
                    onClick={onVisibilityClick}
                    variant="translucent"
                    css={{
                        borderRadius: '10%',
                        marginLeft: '10px',
                    }}
                >
                    {sprite.prefs.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            </Container>
        </>
    );
};