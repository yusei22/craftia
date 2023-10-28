import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { Sprite, searchSpriteFromID } from 'application/sprites/Sprite';
import { spriteTreeAtom } from 'dataflow';
import { artbordZoomSelector } from 'dataflow/artboard/artboardZoomSelector';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useSpriteMover = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const getArtboardZoomSync = useRecoilValueSyncReader<number>();

    const moveSprite = useCallback((targetSprite: Sprite, delta: Vec2) => {
        const _delta = delta.times(1 / getArtboardZoomSync(artbordZoomSelector));

        setSpriteTree((curTree) => {
            const newTree = [...curTree];
            const [sprite, index] = searchSpriteFromID(newTree, targetSprite.prefs.id);
            if (index !== null && sprite !== null) {
                newTree[index] = sprite?.setSpritePrefs((curPrefs) => ({
                    ...curPrefs,
                    globalLocation: curPrefs.globalLocation.add(_delta),
                }));
            }
            return newTree;
        });
    }, []);

    return moveSprite;
};
