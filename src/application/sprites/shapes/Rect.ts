import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig } from '../Sprite';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

interface RectPrefs extends ShapePrefs {
    readonly round: number;
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
    public setPrefs(valOrUpdater: ValueUpdater<RectPrefs> | RectPrefs) {
        if (typeof valOrUpdater === 'function') {
            return new Rect(valOrUpdater(this.prefs));
        } else {
            return new Rect(valOrUpdater);
        }
    }
    /**
     * 描画
     * @param context レンダリング先のコンテクスト
     */
    public drawFunc(context: Context2D): void {
        context.translate(this.prefs.globalLocation);
        context.rotate(this.prefs.rotation);
        context.translate(this.prefs.globalLocation.times(-1));
        context.rect(this.getStartPoint(), this.prefs.scale);
        context.fill();
        context.stroke();
    }
    public drawZoomFunc(context: Context2D, zoom: number) {
        const _rect = this.setPrefs((curVal) => ({
            ...curVal,
            scale: curVal.scale.times(zoom),
            globalLocation: curVal.globalLocation.times(zoom),
            strokeWidth: curVal.strokeWidth ? curVal.strokeWidth * zoom : null,
        }));
        _rect.draw(context);
    }
}
export { Rect };
