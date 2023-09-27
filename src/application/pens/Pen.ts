import { PointerType } from '@use-gesture/react';
import { Vec, Vec2 } from 'application/core/units';

type pointerProps = {
    readonly pointerLoc: Vec;
    readonly pressure: number;
    readonly tangentialPressure: number;
    readonly tilt: Vec2;
    readonly twist: number;
    readonly pointerType: PointerType;
};

type PointerMoveProps = pointerProps & { IsDragged: boolean };

abstract class Pen {
    abstract pointerDown(props: pointerProps): void;
    abstract pointermove(props: PointerMoveProps): void;
    abstract pointerUp(props: pointerProps): void;
}
