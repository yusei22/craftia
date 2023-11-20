import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { stageTransformAtom, renderViewListenersAtom } from 'dataflow';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';

export const StageMoveModeButtonWrapper = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const setStageTransform = useSetRecoilState(stageTransformAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta }) => {
                setStageTransform(({ location, ...param }) => {
                    return {
                        ...param,
                        location: location.add(new Vec2(delta)),
                    };
                });
            },
            onMove,
            onClick: () => { },
        });
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};
