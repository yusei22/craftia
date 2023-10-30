import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { RenderViewListeners, artboardTransformAtom } from 'dataflow';

const useRenderViewMouseGesture = () => {
    const setArtboardTransform = useSetRecoilState(artboardTransformAtom);

    let PinchPreviousOffset = new Vec2(0, 0);

    const onMove: RenderViewListeners['onMove'] = ({ event, offset }) => {
        event.preventDefault();
        if (event.buttons === 4) {
            setArtboardTransform(({ location, ...param }) => {
                return {
                    ...param,
                    location: location.add(new Vec2(offset)).sub(PinchPreviousOffset),
                };
            });
        }
        PinchPreviousOffset = new Vec2(offset);
    };

    return { onMove: useCallback(onMove, []) };
};
export { useRenderViewMouseGesture };
