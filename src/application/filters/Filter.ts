import { ISpriteExecutor } from 'application/ISpriteWorker';
import { Vec2 } from 'application/core/units';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { RasterizedPreviewer } from 'application/sprites/RasterizedPreviewer';
import { SmartImage } from 'application/sprites/SmartImage';
import { SmartImagePreviewer } from 'application/sprites/SmartImagePreviewer';

export interface FilterConfigs {}
export type FilterTarget = Rasterizedmage | SmartImage;

export abstract class GLFilter<T extends FilterConfigs = FilterConfigs> {
    abstract getExecutor(gl2: WebGL2RenderingContext, sprite: FilterTarget): FilterExecutor<T>;
}

export abstract class FilterExecutor<T extends FilterConfigs = FilterConfigs>
    implements ISpriteExecutor
{
    protected readonly targetSprite: FilterTarget;

    constructor(targetSprite: FilterTarget) {
        this.targetSprite = targetSprite;
    }

    public abstract execute(config: T): void;
    public abstract getResult(): HTMLCanvasElement | OffscreenCanvas;

    public getPreviewSprite() {
        if (this.targetSprite instanceof Rasterizedmage) {
            const newImage = this.getResult();
            const newImageResolution = new Vec2(newImage.width, newImage.height);

            return new RasterizedPreviewer(newImage, {
                ...this.targetSprite.prefs,
                scale: newImageResolution,
                rotation: 0,
            });
        } else {
            const newImage = this.getResult();

            const newScale = new Vec2(
                (this.targetSprite.prefs.scale.x * newImage.width) / this.targetSprite.image.width,
                (this.targetSprite.prefs.scale.y * newImage.height) / this.targetSprite.image.height
            );

            return new SmartImagePreviewer(this.getResult(), {
                ...this.targetSprite.prefs,
                scale: newScale,
            });
        }
    }
    public getOriginalSprite() {
        return this.targetSprite;
    }
}
