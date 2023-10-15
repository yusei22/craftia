import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { artboardTransformAtom, renderViewListenersAtom } from 'dataflow';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';

const ArtboardMoveModeButtonWrapper = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const setArtboardTransform = useSetRecoilState(artboardTransformAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta }) => {
                setArtboardTransform(({ location, ...param }) => {
                    return {
                        ...param,
                        location: location.add(new Vec2(delta)),
                    };
                });
            },
            onMove,
            onClick: () => {},
        });
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};
export { ArtboardMoveModeButtonWrapper };
