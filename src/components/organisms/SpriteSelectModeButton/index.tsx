import { useArtboardTouchGesture } from "hooks/artboard/gestures/useArtboardTouchGesture";
import { useArtboardWheelGesture } from "hooks/artboard/gestures/useArtboardWheelGesture";
import { useSetRecoilState } from 'recoil';
import { renderViewListenersAtom } from 'dataflow';
import { useArtboardMouseGesture } from "hooks/artboard/gestures/useArtboardMouseGesture";


const SpriteSelectModeButton = () => {
    const { onWheel } = useArtboardWheelGesture();
    const { onPinch } = useArtboardTouchGesture();
    const { onMove, } = useArtboardMouseGesture();

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