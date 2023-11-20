import { useCallback, useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { SpritesHitDetector } from 'application/render/SpritesHitDetector';
import { SpriteTree } from 'application/sprites';
import { stageResolutionAtom, spriteTreeAtom } from 'dataflow';
import { useViewPointToStagePointConverter } from 'hooks/stages/useViewPointToStagePointConverter';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

const useSpriteHitDetection = () => {
    const [spritesHitDetector, setSpritesHitDetector] = useState<SpritesHitDetector | null>(null);
    const viewPointToStagePoint = useViewPointToStagePointConverter();
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
            const artobardResolution = getArtobardResolutionSync(stageResolutionAtom);
            const sprites = getSpriteTreeSync(spriteTreeAtom);
            const stagePoint = viewPointToStagePoint(viewPoint);

            spritesHitDetector.viewport(artobardResolution);
            return spritesHitDetector.detect(sprites, stagePoint);
        },
        [spritesHitDetector]
    );

    return detectHitSprite;
};
export { useSpriteHitDetection };
