import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { renderViewListenersAtom } from 'dataflow';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';

export const RenderViewListenerProvider = ({ children }: { children?: React.ReactNode }) => {
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);

    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();

    console.log(onWheel, onPinch);

    useEffect(() => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: () => {},
            onMove,
            onClick: () => {},
        });
    }, []);

    return children;
};
