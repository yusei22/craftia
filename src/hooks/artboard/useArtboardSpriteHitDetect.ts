import { SpritesHitDetector } from 'application/render/SpritesHitDetector';
import { useCallback, useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { getArtBoardPointFromGlobal } from 'application/utils';
import { useRecoilValue } from 'recoil';
import {
    ArtboardRotateAtom,
    ArtboardLocationAtom,
    ArtboardScaleAtom,
    SpriteTreeAtom
} from 'stores';

const useArtboardSpriteHitDetect = () => {
    const [hitDetector, setHitDetector] = useState<SpritesHitDetector | null>(null);
    const artboardRotate = useRecoilValue(ArtboardRotateAtom);
    const artboardScale = useRecoilValue(ArtboardScaleAtom);
    const artboardLocation = useRecoilValue(ArtboardLocationAtom);

    const sprites = useRecoilValue(SpriteTreeAtom);

    useEffect(() => {
        setHitDetector(new SpritesHitDetector());
    }, [])

    const detectHit = useCallback((renderViewPoint: Vec2) => {
        if (!hitDetector) {
            console.error('hitDetector is null')
            return;
        }
        const artboardPoint = getArtBoardPointFromGlobal(
            new Vec2(artboardLocation),
            new Vec2(artboardScale),
            new Vec2(0.5, 0.5),
            artboardRotate,
            renderViewPoint
        )
        return hitDetector.detect(sprites, artboardPoint);
    }, [])

    return detectHit;
}

export default useArtboardSpriteHitDetect;