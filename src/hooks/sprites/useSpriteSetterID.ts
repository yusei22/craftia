import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Sprite } from 'application/sprites';
import { spriteTreeAtom } from 'dataflow';

export const useSpriteSetterID = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    const setSpriteID = useCallback((id: string, callbackfn: (val: Sprite) => Sprite) => {
        setSpriteTree((sprites) =>
            sprites.map((sprite) => (sprite.prefs.id === id ? callbackfn(sprite) : sprite))
        );
    }, []);

    return setSpriteID;
};
