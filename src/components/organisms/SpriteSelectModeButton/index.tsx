import { useRenderViewTouchGesture } from "hooks/renderViews/useRenderViewTouchGesture";
import { useRenderViewWheelGesture } from "hooks/renderViews/useRenderViewWheelGesture";
import { useSetRecoilState } from 'recoil';
import { renderViewListenersAtom } from 'dataflow';
import { useRenderViewMouseGesture } from "hooks/renderViews/useRenderViewMouseGesture";


const SpriteSelectModeButton = () => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove, } = useRenderViewMouseGesture();

    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: () => { },
            onMove,
        })
    }

    return (
        <div onClick={onClick}>
            セレクト!
        </div>
    )
}

export { SpriteSelectModeButton };