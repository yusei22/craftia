import { useCallback, useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { SpritesHitDetector } from 'application/render/SpritesHitDetector'
import { useGetSpriteSync } from 'hooks/sprites/useGetSpriteSync';
import { useGetViewPointToArtboardPointConverter } from 'hooks/artboards/useGetViewPointToArtboardPointConverter';
import { useGetArtobardResolutionSync } from 'hooks/artboards/useGetArtobardResolutionSync';

const useSpriteHitDetection = () => {
    const [spritesHitDetector, setSpritesHitDetector] = useState<SpritesHitDetector | null>(null);
    const viewPointToArtboardPoint = useGetViewPointToArtboardPointConverter();
    const getSpriteSync = useGetSpriteSync();
    const getArtobardResolutionSync = useGetArtobardResolutionSync()

    useEffect(() => {
        setSpritesHitDetector(new SpritesHitDetector());
    }, []);

    const detectHitSprite = useCallback(
        (viewPoint: Vec2) => {
            if (spritesHitDetector === null) {
                console.warn('spritesHitDetector is null');
                return null;
            }
            const artobardResolution = getArtobardResolutionSync();
            const sprites = getSpriteSync();
            const artboardPoint = viewPointToArtboardPoint(viewPoint);

            spritesHitDetector.viewport(artobardResolution)
            return spritesHitDetector.detect(sprites, artboardPoint);
        },
        [spritesHitDetector]
    );

    return detectHitSprite;
};
export { useSpriteHitDetection };
