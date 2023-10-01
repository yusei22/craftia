import { FullGestureState, GestureKey } from '@use-gesture/react';
import { atom } from 'recoil';
import { GestureHandlers } from '@use-gesture/react';



type RenderViewEventFuncs = Pick<GestureHandlers,
    | 'onMove'
    | 'onMoveStart'
    | 'onMoveEnd'
    | 'onPinch'
    | 'onPinchStart'
    | 'onPinchEnd'
    | 'onWheel'
    | 'onWheelStart'
    | 'onWheelEnd'
    | 'onMouseMove'
    | 'onMouseDown'
    | 'onMouseUp'
>

const RenderViewEventFuncsState = atom<RenderViewEventFuncs>({
    key: 'renderViewEventFuncState',
    default: {
        onMove: () => { },
        onMoveStart: () => { },
        onMoveEnd: () => { },
        onPinch: () => { },
        onPinchStart: () => { },
        onPinchEnd: () => { },
        onWheel: () => { },
        onWheelStart: () => { },
        onWheelEnd: () => { },
        onMouseMove: () => { },
        onMouseDown: () => { },
        onMouseUp: () => { },
    }
});

export { RenderViewEventFuncsState };
