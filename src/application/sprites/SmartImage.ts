import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';
import { rotatePoint } from 'application/utils';

interface SmartImagePrefs extends SpritePrefs {
    /**スケール */
    readonly scale: Vec2;
    /**回転 */
    readonly rotation: number;
}

class SmartImage extends Sprite<SmartImagePrefs> {
    public readonly image: ImageBitmap;

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
    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }
    public drawFunc(context: Context2D) {
        context.translate(this.prefs.globalLocation);
        context.rotate(this.prefs.rotation);
        context.translate(this.prefs.globalLocation.times(-1));
        context.drawImage(this.image, this.getStartPoint(), this.prefs.scale);
    }
    public setImage(val: ImageBitmap) {
        return new SmartImage(val, this.prefs);
    }
    public setPrefs(valOrUpdater: ValueUpdater<SmartImagePrefs> | SmartImagePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new SmartImage(this.image, newPrefs);
    }
    public moveAnchor(newAnchor: Vec2) {
        const AnchorsRelativeDifference = new Vec2(
            (newAnchor.x - this.prefs.anchor.x) * this.prefs.scale.x,
            (newAnchor.y - this.prefs.anchor.y) * this.prefs.scale.y
        );

        const newLocation = rotatePoint(
            this.prefs.globalLocation,
            this.prefs.globalLocation.add(AnchorsRelativeDifference),
            this.prefs.rotation
        );

        return this.setPrefs({
            ...this.prefs,
            anchor: newAnchor,
            globalLocation: newLocation,
        });
    }
    public createStatic() {
        return new Promise<SmartImage>((resolve) => {
            resolve(this);
        });
    }
    public drawZoomFunc(context: Context2D, zoom: number) {
        const _smartImage = this.setPrefs((curVal) => ({
            ...curVal,
            scale: curVal.scale.times(zoom),
            globalLocation: curVal.globalLocation.times(zoom),
        }));
        _smartImage.draw(context);
    }
}
export { SmartImage };
