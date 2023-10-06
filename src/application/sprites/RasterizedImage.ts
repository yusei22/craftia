import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

interface RasterizedImagePrefs extends SpritePrefs { }

class Rasterizedmage extends Sprite<RasterizedImagePrefs> {
    private image: ImageBitmap;
    private scale: Vec2;
    private previewContext: Context2D | null = null;

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
        this.scale = new Vec2(image.width, image.height);
    }

    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.image.width,
            this.prefs.anchor.y * this.image.height
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }
    public getCenterPoint() {
        return this.getStartPoint().add(this.getImageSize().times(0.5));
    }
    private getImageSize() {
        return new Vec2(this.image.width, this.image.height);
    }
    public drawFunc(context: Context2D) {
        context.translate(this.getCenterPoint());
        context.rotate(this.prefs.rotation);
        context.translate(this.getCenterPoint().times(-1));
        context.drawImage(this.image, this.getStartPoint(), this.scale);
    }

    public drawPointFunc(context: Context2D, point: Vec2) {
        context.translate(this.getCenterPoint());
        context.rotate(this.prefs.rotation);
        context.translate(this.getCenterPoint().times(-1));

        context.drawImage(this.image, point, new Vec2(1, 1), this.getStartPoint(), this.scale);
    }
    
    public setPreview(source: CanvasImageSource | ImageData) {
        if (this.previewContext === null) this.previewContext = new Context2D();

        this.previewContext.viewport(this.getImageSize());

        if (source instanceof ImageData) {
            this.previewContext.putImageData(source, new Vec2(0, 0));
        } else {
            this.previewContext.drawImage(source, new Vec2(0, 0));
        }
    }
    public clone() {
        return new Rasterizedmage(this.image, { ...this.prefs });
    }
    public async cloneResize(size: Vec2) {
        const resizer = new Resizer();
        return new Rasterizedmage(await resizer.resize(this.image, size), { ...this.prefs });
    }
    public async cloneWithPreviewSource() {
        if (this.previewContext === null) return this.clone();

        return new Rasterizedmage(await createImageBitmap(this.previewContext.getCanvas()), {
            ...this.prefs,
        });
    }
    public previewScale(size: Vec2) {
        this.scale = size;
    }
    public resetPreviewScale() {
        this.scale = this.getImageSize();
    }
}

class Resizer {
    private ctx: Context2D;
    constructor() {
        this.ctx = new Context2D();
    }
    public async resize(image: ImageBitmap, size: Vec2) {
        this.ctx.viewport(size);
        this.ctx.drawImage(image, new Vec2(0, 0), size);
        return await createImageBitmap(this.ctx.getCanvas());
    }
}

export { Rasterizedmage };
