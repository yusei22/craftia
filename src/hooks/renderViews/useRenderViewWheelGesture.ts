import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useStageAnchorMoverViewPoint } from '../stages/useStageAnchorMoverViewPoint';
import { Vec2 } from 'application/core/units';
import { WHEEL_CLOSE_UP_DEGREES } from 'consts';
import { RenderViewListeners, stageTransformAtom } from 'dataflow';

const useRenderViewWheelGesture = () => {
    const changeStageAnchorFromViewPoint = useStageAnchorMoverViewPoint();
    const setStageTransform = useSetRecoilState(stageTransformAtom);

    const onWheel: RenderViewListeners['onWheel'] = ({ delta, event }) => {
        event.preventDefault();

        const zoom =
            delta[1] === 0
                ? 1
                : delta[1] < 0
                ? 1 + WHEEL_CLOSE_UP_DEGREES
                : 1 - WHEEL_CLOSE_UP_DEGREES;

        changeStageAnchorFromViewPoint(new Vec2(event.offsetX, event.offsetY), true);

        setStageTransform(({ scale, ...param }) => {
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
