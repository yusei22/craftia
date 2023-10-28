import { useCallback, useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { SpritesHitDetector } from 'application/render/SpritesHitDetector';
import { SpriteTree } from 'application/sprites/ISprite';
import { artboardResolutionAtom, spriteTreeAtom } from 'dataflow';
import { useViewPointToArtboardPointConverter } from 'hooks/artboards/useViewPointToArtboardPointConverter';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

const useSpriteHitDetection = () => {
    const [spritesHitDetector, setSpritesHitDetector] = useState<SpritesHitDetector | null>(null);
    const viewPointToArtboardPoint = useViewPointToArtboardPointConverter();
    const getSpriteTreeSync = useRecoilValueSyncReader<SpriteTree>();
    const getArtobardResolutionSync = useRecoilValueSyncReader<Vec2>();

    useEffect(() => {
        setSpritesHitDetector(new SpritesHitDetector());
    }, []);

    const detectHitSprite = useCallback(
        (viewPoint: Vec2) => {
            if (spritesHitDetector === null) {
                console.warn('spritesHitDetector is null');
                return null;
            }
            const artobardResolution = getArtobardResolutionSync(artboardResolutionAtom);
            const sprites = getSpriteTreeSync(spriteTreeAtom);
            const artboardPoint = viewPointToArtboardPoint(viewPoint);

            spritesHitDetector.viewport(artobardResolution);
            return spritesHitDetector.detect(sprites, artboardPoint);
        },
        [spritesHitDetector]
    );

    return detectHitSprite;
};
export { useSpriteHitDetection };
