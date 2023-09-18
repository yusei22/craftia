import { Vec2 } from "application/core/units";
import { Sprite, SpriteConfig, SpritePrefs } from "./Sprite";
import { Context2D } from "application/core/context-2d";
interface SmartImagePrefs extends SpritePrefs {
    readonly scale: Vec2;
}
class SmartImage extends Sprite<SmartImagePrefs>{
    readonly image: ImageBitmap;
    constructor(image: ImageBitmap, prefs: SmartImagePrefs) {
        const config: SpriteConfig = {
            line: null,
            shadow: prefs.shadow,
            text: null,
            fillStyle: null,
            globalAlpha: prefs.opacity,
            globalCompositeOperation: prefs.blendMode,
            strokeStyle: null,
        }
        super(config, prefs);
        this.image = image;
    }
    private getAnchorRerativeLoc() {
        return new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        )
    }
    public drawFunc(context: Context2D) {
        if (!this.prefs.visible) return;
        context.drawImage(
            this.image,
            this.prefs.globalLocation.sub(this.getAnchorRerativeLoc()),
            this.prefs.scale
        )
    }
}
export { SmartImage };