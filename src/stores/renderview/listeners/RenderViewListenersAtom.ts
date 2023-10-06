import { atom } from 'recoil';
import { Handler, WebKitGestureEvent } from '@use-gesture/react';
import { AtomKeys } from 'stores/recoilKeys';

type RenderViewListeners = {
    onMove: Handler<"move", PointerEvent>;
    onPinch: Handler<"pinch", PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent>;
    onWheel: Handler<"wheel", WheelEvent>;
}
const RenderViewListenersAtom = atom<RenderViewListeners>({
    key: AtomKeys.RENDERVIEW_LISTENERS_ATOM,
    default: {
        onMove: () => { },
        onPinch: () => { },
        onWheel: () => { },
    }
});

export type { RenderViewListeners };
export { RenderViewListenersAtom };
