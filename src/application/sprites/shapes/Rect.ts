import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig, SpritePrefsValue } from '../Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface RectPrefs extends ShapePrefs {
    round: number;
}

class Rect extends Shape<RectPrefs> {
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
    public clone() {
        return new Rect({ ...this.prefs });
    }
    public drawFunc(context: Context2D): void {
        context.translate(this.getCenterPoint());
        context.rotate(this.prefs.rotation);
        context.translate(this.getCenterPoint().times(-1));
        context.roundRect(this.getStartPoint(), this.prefs.scale, this.prefs.round);
        context.fill();
        context.stroke();
    }
}
export { Rect };
