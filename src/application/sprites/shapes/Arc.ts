import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig, SpritePrefs } from '../Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';

interface ArcPrefs extends ShapePrefs {
    readonly startAngle: number;
    readonly endAngle: number;
}
class Arc extends Shape<ArcPrefs> {
    constructor(prefs: ArcPrefs) {
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
            fillStyle: null,
            globalAlpha: prefs.opacity,
            globalCompositeOperation: prefs.blendMode,
            strokeStyle: null,
        };
        super(config, prefs);
    }
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Arc(newRasterizedImagePrefs);
    }
    public setShapePrefs(valOrUpdater: ShapePrefs | ValueUpdater<ShapePrefs>): Shape<ArcPrefs> {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Arc(newRasterizedImagePrefs);
    }

    /**
     * Arcスプライト固有の環境設定をセットする
     * @param valOrUpdater 更新関数または新しい環境設定
     * @returns 新しいシェイプ
     */
    public setArcPrefs(valOrUpdater: ValueUpdater<ArcPrefs> | ArcPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Arc(newPrefs);
    }

    public drawFunc(context: AbstractContext2D): void {
        context.beginPath();
        context.ellipse(
            this.prefs.globalLocation,
            this.prefs.scale,
            this.prefs.rotation,
            this.prefs.startAngle,
            this.prefs.endAngle
        );
        context.fill();
        context.stroke();
    }
    public drawZoomFunc(context: AbstractContext2D, zoom: number) {
        const _arc = this.setArcPrefs((curVal) => ({
            ...curVal,
            scale: curVal.scale.times(zoom),
            globalLocation: curVal.globalLocation.times(zoom),
            strokeWidth: curVal.strokeWidth ? curVal.strokeWidth * zoom : null,
        }));
        _arc.draw(context);
    }
    public createStatic() {
        return new Promise<Arc>((resolve) => {
            resolve(this);
        });
    }
}
export { Arc };
