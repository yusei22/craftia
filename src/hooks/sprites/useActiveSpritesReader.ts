import { useCallback } from 'react';
import { Sprite, searchSpritesFromIDs } from 'application/sprites/Sprite';
import { spriteTreeAtom } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useActiveSpritesReader = () => {
    const getSpriteSync = useRecoilValueSyncReader<Sprite<any>[]>();// eslint-disable-line
    const getActiveSpriteIdSync = useRecoilValueSyncReader<string[]>();

    const readActiveSprites = useCallback(() => {
        const sprites = getSpriteSync(spriteTreeAtom);
        const activeSpriteIds = getActiveSpriteIdSync(activeSpriteIdsAtom);

        return searchSpritesFromIDs(sprites, activeSpriteIds);
    }, []);
    return readActiveSprites;
};
