import { Cache } from '../Cache';
import { Shape, ShapePrefs } from '../Shape';
import { SpritePrefs } from '../Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { AtLeastArray, ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export interface RectPrefs extends ShapePrefs {
    readonly round: AtLeastArray<4, number>;
}

export class Rect extends Shape<RectPrefs> {
    constructor(prefs: RectPrefs, cache: Cache<RectPrefs> | null) {
        super(prefs, cache);
    }
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rect(newRasterizedImagePrefs, this.cache);
    }
    public setShapePrefs(valOrUpdater: ShapePrefs | ValueUpdater<ShapePrefs>): Shape<RectPrefs> {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rect(newRasterizedImagePrefs, this.cache);
    }
    public setRectPrefs(valOrUpdater: ValueUpdater<RectPrefs> | RectPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Rect(newPrefs, this.cache);
    }
    public createStatic() {
        return new Promise<Rect>((resolve) => {
            resolve(this);
        });
    }
    public getMaxSize() {
        return this.prefs.scale
            .add(new Vec2(this.prefs.strokeWidth || 0))
            .add(new Vec2(this.prefs.shadowBlur || 0).times(2));
    }
    protected rasterizeFunc(context: AbstractContext2D) {
        const rasterizeSize = this.prefs.scale.add(new Vec2(this.prefs.strokeWidth || 0));

        context.viewport(rasterizeSize);

        this.setconfig(context, {
            line: {
                lineCap: this.prefs.strokeCap,
                lineDashOffset: this.prefs.strokeDashOffset,
                lineJoin: this.prefs.strokeJoin,
                lineWidth: this.prefs.strokeWidth,
            },
            shadow: null,
            text: null,
            fillStyle: this.prefs.fillStyle,
            globalAlpha: null,
            globalCompositeOperation: null,
            strokeStyle: this.prefs.strokeStyle,
        });

        const rectStartPoint = context.size.times(0.5).sub(this.prefs.scale.times(0.5));

        context.roundRect(rectStartPoint, this.prefs.scale, this.prefs.round);
        context.fill();
        context.stroke();
    }
    public copy() {
        return new Rect(this.prefs, null);
    }
}
