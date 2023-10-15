import { Handler, SharedGestureState, WebKitGestureEvent } from '@use-gesture/react';
import { atom } from 'recoil';

type RenderViewListeners = {
    onMove: Handler<'move', PointerEvent>;
    onPinch: Handler<'pinch', PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent>;
    onWheel: Handler<'wheel', WheelEvent>;
    onDrag: Handler<'drag', PointerEvent | MouseEvent | TouchEvent | KeyboardEvent>;
    onClick: (
        state: SharedGestureState & {
            event: MouseEvent;
            args: any;// eslint-disable-line
        },
        ...args: any// eslint-disable-line
    ) => void;
};
const renderViewListenersAtom = atom<RenderViewListeners>({
    key: 'renderViewListenersAtom',
    default: {
        onMove: () => {},
        onPinch: () => {},
        onWheel: () => {},
        onDrag: () => {},
        onClick: () => {},
    },
});

export type { RenderViewListeners };
export { renderViewListenersAtom };
