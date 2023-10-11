import { useGetActiveSpriteIdsSync } from './useGetActiveSpriteIdsSync';
import { useGetSpriteTreeSync } from './useGetSpriteTreeSync';
import { searchSpritesFromIDs } from 'application/sprites/Sprite';

const useGetActiveSprites = () => {
    const getSpriteSync = useGetSpriteTreeSync();
    const getActiveSpriteIdSync = useGetActiveSpriteIdsSync();

    const getActiveSpritesInfo = () => {
        const sprites = getSpriteSync();
        const activeSpriteIds = getActiveSpriteIdSync();
        return searchSpritesFromIDs(sprites, activeSpriteIds);
    };
    return getActiveSpritesInfo;
};

export { useGetActiveSprites };
