import { Sprite, SpriteConfig, SpritePrefs, SpritePrefsValue } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface SmartImagePrefs extends SpritePrefs {
    scale: Vec2;
}

class SmartImage extends Sprite<SmartImagePrefs> {
    private image: ImageBitmap;
    private previewContext: Context2D | null = null;

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
    public getStartPoint() {
        return this.prefs.globalLocation.sub(this.getAnchorRerativeLoc());
    }
    public getCenterPoint() {
        return this.getStartPoint().add(this.prefs.scale.times(0.5));
    }
    public drawFunc(context: Context2D) {
        context.translate(this.getCenterPoint());
        context.rotate(this.prefs.rotation);
        context.translate(this.getCenterPoint().times(-1));
        context.drawImage(this.image, this.getStartPoint(), this.prefs.scale);
    }
    public drawPointFunc(context: Context2D, point: Vec2) {
        context.translate(this.getCenterPoint());
        context.rotate(this.prefs.rotation);
        context.translate(this.getCenterPoint().times(-1));
        context.drawImage(
            this.image,
            point,
            new Vec2(1, 1),
            this.getStartPoint(),
            this.prefs.scale
        );
    }
    public setPreview(source: CanvasImageSource | ImageData) {
        if (this.previewContext === null) this.previewContext = new Context2D();
        if (source instanceof ImageData) {
            this.previewContext.putImageData(source, new Vec2(0, 0));
        } else {
            this.previewContext.drawImage(source, new Vec2(0, 0));
        }
    }
    public clone() {
        return new SmartImage(this.image, { ...this.prefs });
    }
}
export { SmartImage };
