import { Interpolation, Theme } from '@emotion/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MouseEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { Sprite, searchSpriteFromID } from 'application/sprites/Sprite';
import IconButton from 'components/atoms/IconButton';
import { spriteTreeAtom, useSpriteHistPresentValSyncReader, useSpriteTreeSaver } from 'dataflow';

const iconStyle: Interpolation<Theme> = (theme) => ({
    fontSize: theme.fontSize.md2,
});

export const LayerVisibility = ({ sprite }: { sprite: Sprite }) => {
    const getSpriteTreeHistPresentSync = useSpriteHistPresentValSyncReader();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();

    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        const sprites = getSpriteTreeHistPresentSync();
        const [, index] = searchSpriteFromID(sprites, sprite.prefs.id);

        if (index !== null) {
            setSpriteTree((culVal) => {
                const newTree = [...culVal];
                newTree[index] = sprite.setSpritePrefs((culPrefs) => ({
                    ...culPrefs,
                    visible: !culPrefs.visible,
                }));
                return newTree;
            });
            saveSpriteTree();
        }
    };

    return (
        <IconButton
            onClick={onClick}
            variant="transparent"
            css={(theme) => ({
                padding: '3px',
                borderRadius: '10%',
                marginLeft: '10px',
                fontSize: theme.fontSize.xs,
            })}
        >
            {sprite.prefs.visible ? (
                <VisibilityIcon css={iconStyle} />
            ) : (
                <VisibilityOffIcon css={iconStyle} />
            )}
        </IconButton>
    );
};
