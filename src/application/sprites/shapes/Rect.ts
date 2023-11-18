import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig, SpritePrefs } from '../Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { AtLeastArray, ValueUpdater } from 'application/core/types';
import { Vec4 } from 'application/core/units';

interface RectPrefs extends ShapePrefs {
    readonly round: AtLeastArray<4, number>;
}

class Rect extends Shape<RectPrefs> {
    /**
     * コンストラクタ
     * @param prefs スプライトの環境設定
     */
    constructor(prefs: RectPrefs) {
        const config: SpriteConfig = {
            line: {
                lineCap: prefs.strokeCap,
                lineDashOffset: prefs.strokeDashOffset,
                lineJoin: prefs.strokeJoin,
                lineWidth: prefs.strokeWidth,
            },
            shadow: {
                shadowBlur: prefs.shadowBlur,
                shadowColor: prefs.shadowColor,
                shadowOffset: prefs.shadowOffset,
            },
            text: null,
            fillStyle: prefs.fillStyle,
            globalAlpha: prefs.opacity,
            globalCompositeOperation: prefs.blendMode,
            strokeStyle: prefs.strokeStyle,
        };
        super(config, prefs);
    }
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rect(newRasterizedImagePrefs);
    }
    public setShapePrefs(valOrUpdater: ShapePrefs | ValueUpdater<ShapePrefs>): Shape<RectPrefs> {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rect(newRasterizedImagePrefs);
    }
    public setRectPrefs(valOrUpdater: ValueUpdater<RectPrefs> | RectPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Rect(newPrefs);
    }
    public drawFunc(context: AbstractContext2D): void {
        context.translate(this.prefs.globalLocation);
        context.rotate(this.prefs.rotation);
        context.translate(this.prefs.globalLocation.times(-1));
        context.roundRect(this.getStartPoint(), this.prefs.scale, this.prefs.round);
        context.fill();
        context.stroke();
    }
    public drawZoomFunc(context: AbstractContext2D, zoom: number) {
        const _rect = this.setRectPrefs((curVal) => ({
            ...curVal,
            scale: curVal.scale.times(zoom),
            globalLocation: curVal.globalLocation.times(zoom),
            strokeWidth: curVal.strokeWidth ? curVal.strokeWidth * zoom : null,
            round: new Vec4(curVal.round).times(zoom).toArray(),
        }));
        _rect.draw(context);
    }
    public createStatic() {
        return new Promise<Rect>((resolve) => {
            resolve(this);
        });
    }
}
export { Rect };
