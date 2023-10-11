import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useChangeArtboardAnchorFromViewPoint } from '../artboards/useChangeArtboardAnchorFromViewPoint';
import { Vec2 } from 'application/core/units';
import { WHEEL_CLOSE_UP_DEGREES } from 'consts';
import { RenderViewListeners, artboardTransformAtom } from 'dataflow';

const useRenderViewWheelGesture = () => {
    const changeArtboardAnchorFromViewPoint = useChangeArtboardAnchorFromViewPoint();
    const setArtboardTransform = useSetRecoilState(artboardTransformAtom);

    const onWheel: RenderViewListeners['onWheel'] = ({ delta, event, startTime }) => {
        event.preventDefault();

        const zoom =
            delta[1] === 0
                ? 1
                : delta[1] < 0
                ? 1 + WHEEL_CLOSE_UP_DEGREES
                : 1 - WHEEL_CLOSE_UP_DEGREES;

        changeArtboardAnchorFromViewPoint(new Vec2(event.offsetX, event.offsetY), true);

        setArtboardTransform(({ scale, ...param }) => {
            return {
                ...param,
                scale: scale.times(zoom),
            };
        });
    };

    return {
        onWheel: useCallback(onWheel, []),
    };
};

export { useRenderViewWheelGesture };
