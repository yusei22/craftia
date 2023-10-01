import { Context2D, Repetition } from 'application/core/context-2d';
import { Vec2, Vec4 } from 'application/core/units';
interface FillPrefs<T> {
    cloneEdit(param: Partial<T>): T;
    createCanvasFillStyle(context: Context2D): CanvasGradient | CanvasPattern | null | string;
}

interface IFillLinerGradient {
    readonly startPoint: Vec2;
    readonly endPoint: Vec2;
}

class FillLinerGradient implements IFillLinerGradient, FillPrefs<IFillLinerGradient> {
    readonly startPoint: Vec2;
    readonly endPoint: Vec2;
    constructor({ startPoint, endPoint }: IFillLinerGradient) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    public createCanvasFillStyle(context: Context2D) {
        return context.createLinearGradient(this.startPoint, this.endPoint);
    }
    public cloneEdit({ startPoint, endPoint }: Partial<IFillLinerGradient>) {
        return new FillLinerGradient({
            startPoint: startPoint ?? this.startPoint,
            endPoint: endPoint ?? this.endPoint,
        });
    }
}

interface IFillRadialGradient {
    readonly startPoint: Vec2;
    readonly startRound: number;
    readonly endPoint: Vec2;
    readonly endRound: number;
}

class FillRadialGradient implements IFillRadialGradient, FillPrefs<IFillRadialGradient> {
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
    public cloneEdit({ startPoint, startRound, endPoint, endRound }: Partial<IFillRadialGradient>) {
        return new FillRadialGradient({
            startPoint: startPoint ?? this.startPoint,
            startRound: startRound ?? this.startRound,
            endPoint: endPoint ?? this.endPoint,
            endRound: endRound ?? this.endRound,
        });
    }
}

interface IFillPattern {
    readonly image: ImageBitmap;
    readonly repetition: Repetition;
}

class FillPattern implements IFillPattern, FillPrefs<IFillPattern> {
    readonly image: ImageBitmap;
    readonly repetition: Repetition;
    constructor({ image, repetition }: IFillPattern) {
        this.image = image;
        this.repetition = repetition;
    }
    public createCanvasFillStyle(context: Context2D) {
        return context.createPattern(this.image, this.repetition);
    }
    public cloneEdit({ image, repetition }: Partial<IFillPattern>) {
        return new FillPattern({
            image: image ?? this.image,
            repetition: repetition ?? this.repetition,
        });
    }
}

interface IFillSolid {
    readonly color: Vec4;
}
class FillSolid implements IFillSolid, FillPrefs<IFillSolid> {
    readonly color: Vec4;
    constructor({ color }: IFillSolid) {
        this.color = color;
    }
    public createCanvasFillStyle() {
        return `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
    }
    public cloneEdit({ color }: Partial<IFillSolid>): IFillSolid {
        return new FillSolid({ color: color ?? this.color });
    }
}
export type { IFillLinerGradient, IFillRadialGradient, IFillPattern, IFillSolid };
export { FillLinerGradient, FillRadialGradient, FillPattern, FillSolid };
