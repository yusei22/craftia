import { searchSpritesFromIDs } from 'application/sprites/Sprite';
import { useGetSpriteSync } from './useGetSpriteSync';
import { useGetActiveSpriteIdsSync } from './useGetActiveSpriteIdsSync';

const useGetActiveSprites = () => {
    const getSpriteSync = useGetSpriteSync();
    const getActiveSpriteIdSync = useGetActiveSpriteIdsSync()

    const getActiveSpritesInfo = () => {
        const sprites = getSpriteSync();
        const activeSpriteIds = getActiveSpriteIdSync();
        return searchSpritesFromIDs(sprites, activeSpriteIds);
    }
    return getActiveSpritesInfo;
}

export { useGetActiveSprites };