import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface RasterizedImagePrefs extends SpritePrefs {}

class Rasterizedmage extends Sprite<RasterizedImagePrefs> {
    readonly image: ImageBitmap;

    constructor(image: ImageBitmap, prefs: RasterizedImagePrefs) {
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
    private get imageSize() {
        return new Vec2(this.image.width, this.image.height);
    }
    private getAnchorRerativeLoc() {
        return new Vec2(
            this.prefs.anchor.x * this.image.width,
            this.prefs.anchor.y * this.image.height
        );
    }
    public drawFunc(context: Context2D) {
        if (!this.prefs.visible) return;

        const startPint = this.prefs.globalLocation.sub(this.getAnchorRerativeLoc());
        const centerPoint = startPint.add(this.imageSize.times(0.5));

        context.translate(centerPoint).rotate(this.prefs.rotation).drawImage(this.image, startPint);
    }
}

export { Rasterizedmage };
