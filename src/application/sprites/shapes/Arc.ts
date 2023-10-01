import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig, SpritePrefsValue } from '../Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface ArcPrefs extends ShapePrefs {
    startAngle: number;
    endAngle: number;
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
    public clone() {
        return new Arc({ ...this.prefs });
    }
    public drawFunc(context: Context2D): void {
        const centerPoint = this.getCenterPoint();
        context.beginPath();
        context.ellipse(
            centerPoint,
            this.prefs.scale,
            this.prefs.rotation,
            this.prefs.startAngle,
            this.prefs.endAngle
        );
        context.fill();
        context.stroke();
    }
}
export { Arc };
