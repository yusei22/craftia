import { Cache } from './Cache';
import { Sprite, SpritePrefs } from './Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2, isVec } from 'application/core/units';
import { rotatePoint } from 'application/utils/BoardGeometry';

export interface SmartImagePrefs extends SpritePrefs {
    /**スケール */
    readonly scale: Vec2;
    /**回転 */
    readonly rotation: number;
}

export const CASH_INDEPENDENT_SMARTIMAGE_PROPS: string[] = [
    'id',
    'name',
    'anchor',
    'globalLocation',
    'visible',
    'blendMode',
    'opacity',
    'rotation',
];

export class SmartImage extends Sprite<SmartImagePrefs> {
    protected cache: Cache<SmartImagePrefs> | null;
    public readonly image: ImageBitmap;

    constructor(image: ImageBitmap, prefs: SmartImagePrefs, cache: Cache<SmartImagePrefs> | null) {
        super(prefs);
        this.image = image;
        this.cache = cache;
    }
    public needCache() {
        if (this.prefs.shadowBlur && this.prefs.shadowBlur > 0) return true;

        return false;
    }
    protected needChacheUpdate(oldPrefs: SmartImagePrefs | null, newPrefs: SmartImagePrefs) {
        if (oldPrefs === null) return true;

        if (oldPrefs === newPrefs) return false;

        for (const key in oldPrefs) {
            const newVal = newPrefs[key];
            const oldVal = oldPrefs[key];

            if (newVal === oldVal) continue;
            if (isVec(newVal) && isVec(oldVal) && newVal.equal(oldVal)) continue;
            if (CASH_INDEPENDENT_SMARTIMAGE_PROPS.includes(key)) continue;

            return true;
        }
        return false;
    }
    public getMaxSize() {
        return this.prefs.scale.add(new Vec2(this.prefs.shadowBlur || 0).times(2));
    }
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newSpritePrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        const SmartImagePrefs = { ...this.prefs, ...newSpritePrefs };

        return new SmartImage(this.image, SmartImagePrefs, this.cache);
    }
    public setSmartImagePrefs(valOrUpdater: ValueUpdater<SmartImagePrefs> | SmartImagePrefs) {
        const newSpritePrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new SmartImage(this.image, newSpritePrefs, this.cache);
    }
    public setImage(val: ImageBitmap) {
        return new SmartImage(val, this.prefs, this.cache);
    }
    public _moveAnchor(newAnchor: Vec2) {
        const AnchorsRelativeDifference = new Vec2(
            (newAnchor.x - this.prefs.anchor.x) * this.prefs.scale.x,
            (newAnchor.y - this.prefs.anchor.y) * this.prefs.scale.y
        );

        const newLocation = rotatePoint(
            this.prefs.globalLocation,
            this.prefs.globalLocation.add(AnchorsRelativeDifference),
            this.prefs.rotation
        );

        return {
            ...this.prefs,
            anchor: newAnchor,
            globalLocation: newLocation,
        };
    }
    public moveAnchor(newAnchor: Vec2) {
        return this.setSpritePrefs(this._moveAnchor(newAnchor));
    }
    private updateCacheImage(cacheContext: AbstractContext2D) {
        cacheContext.viewport(this.getMaxSize());
        cacheContext.resetTransform();

        const imageCenterPoint = cacheContext.size.times(0.5);
        const imageStartPoint = imageCenterPoint.sub(this.prefs.scale.times(0.5));

        this.setconfig(cacheContext, {
            line: null,
            shadow: {
                shadowBlur: this.prefs.shadowBlur,
                shadowColor: this.prefs.shadowColor,
                shadowOffset: this.prefs.shadowOffset,
            },
            text: null,
            fillStyle: null,
            globalAlpha: null,
            globalCompositeOperation: null,
            strokeStyle: null,
        });

        cacheContext.drawImage(this.image, imageStartPoint, this.prefs.scale);
    }
    private updateCache() {
        const cachePrefs = {
            anchor: new Vec2(0.5, 0.5),
            globalLocation: this._moveAnchor(new Vec2(0.5, 0.5)).globalLocation,
            rotation: 0,
            visible: this.prefs.visible,
            blendMode: this.prefs.blendMode,
            opacity: this.prefs.opacity,
            shadowBlur: null,
            shadowColor: null,
            shadowOffset: null,
            scale: this.getMaxSize(),
        };

        this.cache =
            this.cache?.setDrawConfigs(cachePrefs) ?? new Cache<SmartImagePrefs>(cachePrefs, null);

        if (!this.needChacheUpdate(this.cache.deps, this.prefs)) {
            return this.cache;
        }

        this.cache.update((context) => {
            this.updateCacheImage(context);
        }, this.prefs);

        return this.cache;
    }
    public drawZoomFunc(context: AbstractContext2D, auxContext: AbstractContext2D, zoom: number) {
        if (this.needCache()) {
            const cache = this.updateCache();
            cache.drawZoom(context, auxContext, zoom);
        } else {
            this.drawZoomFuncWithoutCache(context, zoom);
        }
    }
    public drawFunc(context: AbstractContext2D, auxContext: AbstractContext2D): void {
        if (this.needCache()) {
            const cache = this.updateCache();
            cache.draw(context, auxContext);
        } else {
            this.drawFuncWithoutCache(context);
        }
    }
    public drawFuncWithoutCache(context: AbstractContext2D) {
        this._drawFuncWithoutCache(context, this.prefs);
    }
    public _drawFuncWithoutCache(context: AbstractContext2D, prefs: SmartImagePrefs) {
        const startPoint = prefs.globalLocation.sub(
            new Vec2(prefs.anchor.x * prefs.scale.x, prefs.anchor.y * prefs.scale.y)
        );

        this.setconfig(context, {
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
        });

        context.translate(prefs.globalLocation);
        context.rotate(prefs.rotation);
        context.translate(prefs.globalLocation.times(-1));
        context.drawImage(this.image, startPoint, prefs.scale);
    }
    public drawZoomFuncWithoutCache(context: AbstractContext2D, zoom: number) {
        this._drawFuncWithoutCache(context, {
            ...this.prefs,
            scale: this.prefs.scale.times(zoom),
            globalLocation: this.prefs.globalLocation.times(zoom),
            shadowBlur: this.prefs.shadowBlur ? this.prefs.shadowBlur * zoom : null,
        });
    }
    public createStatic() {
        return new Promise<SmartImage>((resolve) => {
            resolve(this);
        });
    }
    public copy() {
        return new SmartImage(this.image, this.prefs, null);
    }
}
