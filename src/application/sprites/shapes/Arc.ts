import { Context2D } from "application/core/context-2d";
import { Shape, ShapePrefs } from "../Shape";
import { SpriteConfig } from "../Sprite";
import { Vec2 } from "application/core/units";

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
            shadow: prefs.shadow,
            text: null,
            fillStyle: prefs.fillStyle,
            globalAlpha: prefs.opacity,
            globalCompositeOperation: prefs.blendMode,
            strokeStyle: prefs.strokeStyle,
        }
        super(config, prefs);
    }
    private getAnchorRerativeLoc() {
        return new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        )
    }
    public drawFunc(context: Context2D): void {
        if (!this.prefs.visible) return;
        
        const centerPoint = this.prefs.globalLocation
            .sub(this.getAnchorRerativeLoc())
            .add(this.prefs.scale.times(0.5))
        context
            .beginPath()
            .ellipse(
                centerPoint,
                this.prefs.scale,
                this.prefs.rotation,
                this.prefs.startAngle,
                this.prefs.endAngle
            )
            .stroke()
    }
}
export { Arc };