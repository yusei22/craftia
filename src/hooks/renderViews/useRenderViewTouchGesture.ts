import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useArtboardAnchorMoverViewPoint } from '../artboards/useArtboardAnchorMoverViewPoint';
import { Vec2 } from 'application/core/units';
import { RenderViewListeners, artboardTransformAtom } from 'dataflow';

const useRenderViewTouchGesture = () => {
    const changeArtboardAnchorFromViewPoint = useArtboardAnchorMoverViewPoint();
    const setArtboardTransform = useSetRecoilState(artboardTransformAtom);

    let PinchPreviousOffset = 0;
    let PinchPreviousOrigin = new Vec2(0, 0);
    let PinchPreviousAngle = 0;

    const onPinch: RenderViewListeners['onPinch'] = ({ offset, origin, event, first, last }) => {
        event.preventDefault();
        if (first) {
            PinchPreviousOffset = offset[0];
            PinchPreviousAngle = offset[1];
            PinchPreviousOrigin = new Vec2(origin);
            return;
        }
        if (last) {
            PinchPreviousOffset = 0;
            PinchPreviousOrigin = new Vec2(0, 0);
            PinchPreviousAngle = 0;
            return;
        }
        changeArtboardAnchorFromViewPoint(new Vec2(origin), true);

        const zoom = offset[0] / PinchPreviousOffset || 1;

        const rotateCurrent = (currentRotate: number) =>
            currentRotate + (offset[1] / 180) * Math.PI - (PinchPreviousAngle / 180) * Math.PI;

        const scaleCurrent = (currentScale: Vec2) => currentScale.times(zoom);

        const translateCurrent = (currentLoc: Vec2) =>
            currentLoc.add(new Vec2(origin)).sub(PinchPreviousOrigin);

        setArtboardTransform(({ rotation, scale, location, ...param }) => {
            return {
                ...param,
                rotation: rotateCurrent(rotation),
                scale: scaleCurrent(scale),
                location: translateCurrent(location),
            };
        });

        PinchPreviousOrigin = new Vec2(origin);
        PinchPreviousOffset = offset[0];
        PinchPreviousAngle = offset[1];
    };
    return {
        onPinch: useCallback(onPinch, []),
    };
};

export { useRenderViewTouchGesture };
