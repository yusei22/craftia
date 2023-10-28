import { Context2D, Repetition } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2, Vec4 } from 'application/core/units';
export interface FillPrefs<T> {
    createCanvasFillStyle(context: Context2D): CanvasGradient | CanvasPattern | null | string;
    setPrefs(valOrUpdater: ValueUpdater<T> | T): T;
}

export interface IFillLinerGradient {
    readonly startPoint: Vec2;
    readonly endPoint: Vec2;
}

export class FillLinerGradient implements IFillLinerGradient, FillPrefs<IFillLinerGradient> {
    readonly startPoint: Vec2;
    readonly endPoint: Vec2;
    constructor({ startPoint, endPoint }: IFillLinerGradient) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    public createCanvasFillStyle(context: Context2D) {
        return context.createLinearGradient(this.startPoint, this.endPoint);
    }
    public setPrefs(valOrUpdater: ValueUpdater<IFillLinerGradient> | IFillLinerGradient) {
        const newPrefs = typeof valOrUpdater === 'function' ? valOrUpdater(this) : valOrUpdater;
        return new FillLinerGradient(newPrefs);
    }
}

export interface IFillRadialGradient {
    readonly startPoint: Vec2;
    readonly startRound: number;
    readonly endPoint: Vec2;
    readonly endRound: number;
}

export class FillRadialGradient implements IFillRadialGradient, FillPrefs<IFillRadialGradient> {
    readonly startPoint: Vec2;
    readonly startRound: number;
    readonly endPoint: Vec2;
    readonly endRound: number;
    constructor({ startPoint, startRound, endPoint, endRound }: IFillRadialGradient) {
        this.startPoint = startPoint;
        this.startRound = startRound;
        this.endPoint = endPoint;
        this.endRound = endRound;
    }
    public createCanvasFillStyle(context: Context2D) {
        return context.createRadialGradient(
            this.startPoint,
            this.startRound,
            this.endPoint,
            this.endRound
        );
    }
    public setPrefs(valOrUpdater: ValueUpdater<IFillRadialGradient> | IFillRadialGradient) {
        const newPrefs = typeof valOrUpdater === 'function' ? valOrUpdater(this) : valOrUpdater;
        return new FillRadialGradient(newPrefs);
    }
}

export interface IFillPattern {
    readonly image: ImageBitmap;
    readonly repetition: Repetition;
}

export class FillPattern implements IFillPattern, FillPrefs<IFillPattern> {
    readonly image: ImageBitmap;
    readonly repetition: Repetition;
    constructor({ image, repetition }: IFillPattern) {
        this.image = image;
        this.repetition = repetition;
    }
    public createCanvasFillStyle(context: Context2D) {
        return context.createPattern(this.image, this.repetition);
    }
    public setPrefs(valOrUpdater: ValueUpdater<IFillPattern> | IFillPattern) {
        const newPrefs = typeof valOrUpdater === 'function' ? valOrUpdater(this) : valOrUpdater;
        return new FillPattern(newPrefs);
    }
}

export interface IFillSolid {
    readonly color: Vec4;
}
export class FillSolid implements IFillSolid, FillPrefs<IFillSolid> {
    readonly color: Vec4;
    constructor({ color }: IFillSolid) {
        this.color = color;
    }
    public createCanvasFillStyle() {
        return `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
    }
    public setPrefs(valOrUpdater: ValueUpdater<IFillSolid> | IFillSolid) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater({ color: this.color }) : valOrUpdater;
        return new FillSolid(newPrefs);
    }
}
