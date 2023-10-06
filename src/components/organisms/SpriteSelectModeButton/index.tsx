import { useArtboardTouchGesture } from "hooks/artboard/useArtboardTouchGesture";
import { useArtboardWheelGesture } from "hooks/artboard/useArtboardWheelGesture";
import { useSetRecoilState } from 'recoil';
import { RenderViewListenersAtom } from 'stores';


const SpriteSelectModeButton = () => {
    const { onWheel } = useArtboardWheelGesture();
    const { onPinch } = useArtboardTouchGesture();

    const setRenderViewListeners = useSetRecoilState(RenderViewListenersAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onMove: () => { },
        })
    }

    return (
        <div onClick={onClick}>
            セレクト!
        </div>
    )
}

export { SpriteSelectModeButton };