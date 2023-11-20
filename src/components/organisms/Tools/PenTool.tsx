import { useSetRecoilState } from 'recoil';
import Wrapper from 'components/layout/Wrapper';
import { renderViewListenersAtom } from 'dataflow';
import { usePen } from 'hooks/pens/usePen';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';

export const PenTool = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();
    const { onDrag, onDragStart, onDragEnd } = usePen();
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: (e) => {
                if (e.first) {
                    onDragStart(e);
                    return;
                }
                if (e.last) {
                    onDragEnd(e);
                    return;
                }
                onDrag(e);
            },
            onMove,
            onClick: () => {},
        });
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};
