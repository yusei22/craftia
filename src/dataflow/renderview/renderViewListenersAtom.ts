import { atom } from 'recoil';
import { Handler, WebKitGestureEvent } from '@use-gesture/react';

type RenderViewListeners = {
    onMove: Handler<"move", PointerEvent>;
    onPinch: Handler<"pinch", PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent>;
    onWheel: Handler<"wheel", WheelEvent>;
    onDrag: Handler<"drag", PointerEvent | MouseEvent | TouchEvent | KeyboardEvent>;
}
const renderViewListenersAtom = atom<RenderViewListeners>({
    key: 'renderViewListenersAtom',
    default: {
        onMove: () => { },
        onPinch: () => { },
        onWheel: () => { },
        onDrag: () => { }
    }
});

export type { RenderViewListeners }
export { renderViewListenersAtom }