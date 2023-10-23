import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';
import { Filter } from 'application/filters/Filter';
import { Pen } from 'application/pens/Pen';

export interface RasterizedImagePrefs extends SpritePrefs {}

export class Rasterizedmage extends Sprite<RasterizedImagePrefs> {
    public readonly image: ImageBitmap;

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
    private getImageSize() {
        return new Vec2(this.image.width, this.image.height);
    }
    public drawFunc(context: Context2D) {
        context.drawImage(this.image, this.getStartPoint());
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
    public setPrefs(valOrUpdater: ValueUpdater<RasterizedImagePrefs> | RasterizedImagePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Rasterizedmage(this.image, newPrefs);
    }
    public setImage(val: ImageBitmap) {
        return new Rasterizedmage(val, this.prefs);
    }
    public async setResize(valOrUpdater: ValueUpdater<Vec2> | Vec2) {
        const resizer = new Resizer();
        const resize =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.getImageSize()) : valOrUpdater;

        return new Rasterizedmage(await resizer.resize(this.image, resize), this.prefs);
    }
    public getSpriteWorker(workerSource: Filter | Pen) {
        return workerSource.getWorker(this);
    }
    public moveAnchor(newAnchor: Vec2) {
        const AnchorsRelativeDifference = new Vec2(
            (newAnchor.x - this.prefs.anchor.x) * this.image.width,
            (newAnchor.y - this.prefs.anchor.y) * this.image.height
        );
        const newLocation = this.prefs.globalLocation.add(AnchorsRelativeDifference);
        return this.setPrefs({
            ...this.prefs,
            anchor: newAnchor,
            globalLocation: newLocation,
        });
    }
    public createStatic() {
        return new Promise<Rasterizedmage>((resolve) => {
            resolve(this);
        });
    }
    public drawZoomFunc(context: Context2D, zoom: number) {
        const _scale = this.getImageSize().times(zoom);
        const _location = this.prefs.globalLocation.times(zoom);

        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * _scale.x,
            this.prefs.anchor.y * _scale.y
        );
        const _startPoint = _location.sub(anchorRerativeLoc);

        context.drawImage(this.image, _startPoint, _scale);
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
