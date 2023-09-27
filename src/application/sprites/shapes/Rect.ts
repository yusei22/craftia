import { Shape, ShapePrefs } from '../Shape';
import { SpriteConfig } from '../Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface RectPrefs extends ShapePrefs {
    readonly round: number;
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
    private getAnchorRerativeLoc() {
        return new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
    }
    public drawFunc(context: Context2D): void {
        if (!this.prefs.visible) return;

        const startPoint = this.prefs.globalLocation.sub(this.getAnchorRerativeLoc());
        const centerPoint = startPoint.add(this.prefs.scale.times(0.5));
        context
            .translate(centerPoint)
            .rotate(this.prefs.rotation)
            .roundRect(startPoint, this.prefs.scale, this.prefs.round)
            .stroke();
    }
    editPrefs(param: Partial<RectPrefs>) {
        const prefsClone = Object.assign({}, this.prefs);
    }
}
export { Rect };
