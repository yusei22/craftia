import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig } from '../Sprite';
import { Context2D } from 'application/core/context-2d';
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
    public setPrefs(valOrUpdater: ValueUpdater<ArcPrefs> | ArcPrefs) {
        if (typeof valOrUpdater === 'function') {
            return new Arc(valOrUpdater(this.prefs));
        } else {
            return new Arc(valOrUpdater);
        }
    }
    public drawFunc(context: Context2D): void {
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
    public drawZoomFunc(context: Context2D, zoom: number) {
        const _arc = this.setPrefs((curVal) => ({
            ...curVal,
            scale: curVal.scale.times(zoom),
            globalLocation: curVal.globalLocation.times(zoom),
            strokeWidth: curVal.strokeWidth ? curVal.strokeWidth * zoom : null,
        }));
        _arc.draw(context);
    }
}
export { Arc };
