import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { Sprite, searchSpriteFromID } from 'application/sprites/Sprite';
import { spriteTreeAtom } from 'dataflow';
import { useGetArtboardZoomSync } from 'hooks/artboards/useGetArtboardZoomSync';

const useMoveSprite = () => {
    const getArtboardZoom = useGetArtboardZoomSync();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    const moveSprite = useCallback((targetSprite: Sprite, delta: Vec2) => {
        const _delta = delta.times(1 / getArtboardZoom());

        setSpriteTree((curTree) => {
            const newTree = [...curTree];
            const [sprite, index] = searchSpriteFromID(newTree, targetSprite.prefs.id);

            if (index !== null && sprite !== null) {
                newTree[index] = sprite?.setPrefs((curPrefs) => ({
                    ...curPrefs,
                    globalLocation: curPrefs.globalLocation.add(_delta),
                }));
            }
            return newTree;
        });
    }, []);

    return moveSprite;
};
export { useMoveSprite };
