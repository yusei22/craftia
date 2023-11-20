import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { searchSpritesFromIDs } from 'application/sprites';
import Slider from 'components/molecules/Slider';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useSpritesSetterIds } from 'hooks/sprites/useSritePrefsSetter';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const LayerOpacitySlider = () => {
    const [opacity, setOpacity] = useState(0);

    const spriteTree = useRecoilValue(spriteTreeAtom);
    const activeSpriteIds = useRecoilValue(activeSpriteIdsAtom);

    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();
    const saveSpriteTree = useSpriteTreeSaver();

    const setSpritesFromIds = useSpritesSetterIds();

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
            <Slider
                uniqueId="LayerOpacitySlider"
                setValue={onPenOpacityChange}
                step={1}
                value={opacity}
                min={0}
                max={100}
            ></Slider>
        </>
    );
};