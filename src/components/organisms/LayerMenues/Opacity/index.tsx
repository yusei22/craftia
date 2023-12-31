import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { searchSpritesFromIDs } from 'application/sprites';
import { SmallNumberField } from 'components/molecules/SmallNumberField';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useCallbackOnSprites } from 'hooks/sprites/useCallbackOnSprites';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export type LayerOpacitySliderProps = {
    className?: string;
};

export const LayerOpacityField = ({ className }: LayerOpacitySliderProps) => {
    const [opacity, setOpacity] = useState(0);

    const spriteTree = useRecoilValue(spriteTreeAtom);
    const activeSpriteIds = useRecoilValue(activeSpriteIdsAtom);

    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();
    const saveSpriteTree = useSpriteTreeSaver();

    const setSpritesFromIds = useCallbackOnSprites();

    useEffect(() => {
        let n = 1;
        let opacity = 0;

        const sprites = searchSpritesFromIDs(spriteTree, activeSpriteIds);

        sprites.forEach((sprite) => {
            opacity = (sprite.prefs.opacity + opacity) / n;
            n++;
        });

        setOpacity(Math.round(opacity * 100));
    }, [activeSpriteIds]);

    const onPenOpacityChange = (opacity: number) => {
        const _opacity = opacity / 100;
        const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);

        setSpritesFromIds(activeIds, (sprite) =>
            sprite.setSpritePrefs((prefs) => ({
                ...prefs,
                opacity: _opacity,
            }))
        );

        saveSpriteTree();
        setOpacity(Math.round(_opacity * 100));
    };

    return (
        <>
            <SmallNumberField
                className={className}
                css={{
                    flexFlow: 'column',
                }}
                id="LayerOpacitySlider"
                setValue={onPenOpacityChange}
                step={1}
                value={opacity}
                min={0}
                max={100}
                label="不透明度："
            ></SmallNumberField>
        </>
    );
};
