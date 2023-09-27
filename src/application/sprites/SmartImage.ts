import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface SmartImagePrefs extends SpritePrefs {
    readonly scale: Vec2;
}

class SmartImage extends Sprite<SmartImagePrefs> {
    readonly image: ImageBitmap;

    private cacheContext: Context2D | null = null;

    constructor(image: ImageBitmap, prefs: SmartImagePrefs) {
        const config: SpriteConfig = {
            line: null,
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
        this.image = image;
    }
    private getAnchorRerativeLoc() {
        return new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
    }
    public drawFunc(context: Context2D) {
        if (!this.prefs.visible) return;

        const startPint = this.prefs.globalLocation.sub(this.getAnchorRerativeLoc());
        const centerPoint = startPint.add(this.prefs.scale.times(0.5));
        context
            .translate(centerPoint)
            .rotate(this.prefs.rotation)
            .drawImage(this.image, startPint, this.prefs.scale);
    }
    public clone() {
        return new SmartImage(this.image, this.prefs);
    }
}
export { SmartImage };
