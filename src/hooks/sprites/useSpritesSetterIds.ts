import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Sprite } from 'application/sprites';
import { spriteTreeAtom } from 'dataflow';

export const useSpritesSetterIds = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    return useCallback((ids: string[], callbackfn: (val: Sprite) => Sprite) => {
        setSpriteTree((sprites) =>
            sprites.map((sprite) => (ids.includes(sprite.prefs.id) ? callbackfn(sprite) : sprite))
        );
    }, []);
};
