import { useRecoilValue } from 'recoil';
import { Vec2 } from 'application/core/units';
import { SpriteTree, searchSpritesFromIDs } from 'application/sprites';
import Checkbox from 'components/molecules/Checkbox';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useSpritesSetterIds } from 'hooks/sprites/useSpritesSetterIds';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const LayerShadowCheakBox = () => {
    const activeIds = useRecoilValue(activeSpriteIdsAtom);
    const spriteTree = useRecoilValue(spriteTreeAtom);
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();
    const saveSpriteTree = useSpriteTreeSaver();
    const setSpritesFromIds = useSpritesSetterIds();

    const getShadowCheaked = (spriteTree: SpriteTree, activeIds: string[]) => {
        let cheaked: boolean = false;

        searchSpritesFromIDs(spriteTree, activeIds).forEach((sprite, i) => {
            if (sprite.prefs.shadowBlur && sprite.prefs.shadowBlur > 0) {
                cheaked = i === 0 ? true : cheaked;
            }
        });
        return cheaked;
    };

    const onChange = (val: boolean) => {
        const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);
        setSpritesFromIds(activeIds, (sprite) =>
            sprite.setSpritePrefs((curPrefs) => ({
                ...curPrefs,
                shadowBlur: val ? 10 : 0,
                shadowColor: '#000',
                shadowOffset: new Vec2(0, 0),
            }))
        );
        saveSpriteTree();
    };

    return (
        <Checkbox
            size="sm"
            id="LayerShadowCheakBox"
            label="シャドウ"
            checked={getShadowCheaked(spriteTree, activeIds)}
            setChecked={onChange}
        />
    );
};
