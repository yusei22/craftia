import { Cache } from '../Cache';
import { Shape, ShapePrefs } from '../Shape';
import { SpritePrefs } from '../Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

interface ArcPrefs extends ShapePrefs {
    readonly startAngle: number;
    readonly endAngle: number;
}
class Arc extends Shape<ArcPrefs> {
    constructor(prefs: ArcPrefs, cache: Cache<ArcPrefs> | null) {
        super(prefs, cache);
    }

    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs): Arc {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Arc(newRasterizedImagePrefs, this.cache);
    }
    public setShapePrefs(valOrUpdater: ShapePrefs | ValueUpdater<ShapePrefs>): Shape<ArcPrefs> {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Arc(newRasterizedImagePrefs, this.cache);
    }

    /**
     * Arcスプライト固有の環境設定をセットする
     * @param valOrUpdater 更新関数または新しい環境設定
     * @returns 新しいシェイプ
     */
    public setArcPrefs(valOrUpdater: ValueUpdater<ArcPrefs> | ArcPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Arc(newPrefs, this.cache);
    }

    public getMaxSize() {
        return this.prefs.scale
            .add(new Vec2(this.prefs.strokeWidth || 0))
            .add(new Vec2(this.prefs.shadowBlur || 0).times(2));
    }
    public createStatic() {
        return new Promise<Arc>((resolve) => {
            resolve(this);
        });
    }
    public rasterizeFunc(context: AbstractContext2D): void {
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

        context.beginPath();
        context.ellipse(
            context.size.times(0.5),
            this.prefs.scale.times(0.5),
            this.prefs.rotation,
            this.prefs.startAngle,
            this.prefs.endAngle
        );
        context.fill();
        context.stroke();
    }
    public copy() {
        return new Arc(this.prefs, null);
    }
}
export { Arc };
