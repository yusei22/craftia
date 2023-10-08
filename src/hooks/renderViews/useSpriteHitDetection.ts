import { useCallback, useEffect, useState } from 'react';
import { RecoilState, RecoilValue, useRecoilCallback } from 'recoil';
import { Vec2 } from 'application/core/units';
import { SpritesHitDetector } from 'application/render/SpritesHitDetector';
import { Sprite } from 'application/sprites/Sprite';
import { getArtBoardPointFromGlobal } from 'application/utils';
import {
    ArtboardTransform,
    artboardResolutionAtom,
    artboardTransformAtom,
    spriteTreeAtom,
} from 'dataflow';

const useSpriteHitDetection = () => {
    const [spritesHitDetector, setSpritesHitDetector] = useState<SpritesHitDetector | null>(null);

    const getRecoilStateSync = useRecoilCallback(
        ({ snapshot }) =>
            (state: RecoilState<unknown> | RecoilValue<unknown>): unknown => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );

    useEffect(() => {
        setSpritesHitDetector(new SpritesHitDetector());
    }, []);

    const detectHitSprite = useCallback(
        (viewPoint: Vec2) => {
            if (spritesHitDetector === null) {
                console.warn('spritesHitDetector is null');
                return null;
            }
            const { anchor, location, scale, rotation } = getRecoilStateSync(
                artboardTransformAtom
            ) as ArtboardTransform;
            const sprites = getRecoilStateSync(spriteTreeAtom) as Sprite[];
            const artboardResolution = getRecoilStateSync(artboardResolutionAtom) as [
                number,
                number,
            ];

            const artboardPoint = getArtBoardPointFromGlobal(
                new Vec2(location),
                new Vec2(scale),
                new Vec2(anchor),
                rotation,
                viewPoint
            );
            spritesHitDetector.viewport(new Vec2(artboardResolution));

            return spritesHitDetector.detect(
                sprites,
                new Vec2(
                    (artboardResolution[0] * artboardPoint.x) / scale[0],
                    (artboardResolution[1] * artboardPoint.y) / scale[1]
                )
            );
        },
        [spritesHitDetector]
    );

    return detectHitSprite;
};

export { useSpriteHitDetection };
