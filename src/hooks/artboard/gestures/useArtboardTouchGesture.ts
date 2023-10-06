import { ArtboardAnchorAtom, RenderViewListeners } from 'stores';
import { Vec2 } from 'application/core/units';
import { useSetRecoilState } from 'recoil';
import { ArtboardLocationAtom, ArtboardRotationAtom, ArtboardScaleAtom, } from 'stores';
import { getRectZoomLoc } from 'application/utils';
import { useCallback } from 'react';


const useArtboardTouchGesture = () => {
    const setArtboardLocation = useSetRecoilState(ArtboardLocationAtom);
    const setArtboardScale = useSetRecoilState(ArtboardScaleAtom);
    const setArtboardRotate = useSetRecoilState(ArtboardRotationAtom);
    const setArtboardAnchor = useSetRecoilState(ArtboardAnchorAtom);


    let PinchPreviousOffset = 0
    let PinchPreviousOrigin = new Vec2(0, 0);
    let PinchPreviousAngle = 0;

    const onPinch: RenderViewListeners['onPinch'] = ({ offset, origin, event, first, last }) => {
        event.preventDefault();
        if (first) {
            PinchPreviousOrigin = new Vec2(origin);
            PinchPreviousOffset = offset[0];
            PinchPreviousAngle = offset[1];
            return;
        }
        if (last) {
            PinchPreviousOffset = 0
            PinchPreviousOrigin = new Vec2(0, 0);
            PinchPreviousAngle = 0;
            return;
        }

        const zoom = offset[0] / PinchPreviousOffset || 1;
        setArtboardAnchor(
            [0.5, 0.5]
        );

        setArtboardLocation((currentLoc) =>
            getRectZoomLoc(
                new Vec2(currentLoc),
                zoom,
                new Vec2(origin)
            ).add(new Vec2(origin)).sub(PinchPreviousOrigin).toArray()
        )
        setArtboardScale((currentScale) =>
            new Vec2(currentScale).times(zoom).toArray()
        )
        setArtboardRotate((currentRotate) => {
            const currentDegree = currentRotate * (180 / Math.PI);
            const newDegree = (currentDegree + offset[1] - PinchPreviousAngle);

            return newDegree / 180 * Math.PI
        })

        PinchPreviousOrigin = new Vec2(origin);
        PinchPreviousOffset = offset[0];
        PinchPreviousAngle = offset[1];

    }
    return {
        onPinch: useCallback(onPinch, []),
    }
}

export { useArtboardTouchGesture };