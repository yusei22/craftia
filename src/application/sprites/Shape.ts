import { Vec2, isVec } from '../core/units';
import { Cache } from './Cache';
import { Sprite, SpritePrefs, SpriteFillStyle, SpritePrefsUpdater } from './Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { rotatePoint } from 'application/utils/BoardGeometry';

export interface ShapePrefs extends SpritePrefs {
    readonly fillStyle: SpriteFillStyle;
    readonly strokeCap: CanvasLineCap | null;
    readonly strokeDashOffset: number | null;
    readonly strokeJoin: CanvasLineJoin | null;
    readonly strokeWidth: number | null;
    readonly strokeStyle: SpriteFillStyle;
    readonly scale: Vec2;
    readonly rotation: number;
}

export const CASH_INDEPENDENT_SHAPE_PROPS: string[] = [
    'id',
    'name',
    'anchor',
    'globalLocation',
    'visible',
    'blendMode',
    'opacity',
    'rotation',
];

export abstract class Shape<T extends ShapePrefs = ShapePrefs> extends Sprite<T> {
    protected cache: Cache<T> | null;

    constructor(prefs: T, cache: Cache<T> | null) {
        super(prefs);

        this.cache = cache;
    }

    /**
     * シェイプ固有の環境設定をセットする
     * @param valOrUpdater 新しいシェイプ
     */
    public abstract setShapePrefs(valOrUpdater: ValueUpdater<ShapePrefs> | ShapePrefs): Shape<T>;

    public abstract setSpritePrefs(
        valOrUpdater: SpritePrefs | SpritePrefsUpdater<SpritePrefs>
    ): Shape<T>;

    protected abstract rasterizeFunc(context: AbstractContext2D): void;
    protected abstract getMaxSize(): Vec2;

    protected needChacheUpdate(oldPrefs: T | null, newPrefs: T) {
        if (oldPrefs === null) return true;

        if (oldPrefs === newPrefs) return false;

        for (const key in oldPrefs) {
            const newVal = newPrefs[key];
            const oldVal = oldPrefs[key];

            if (newVal === oldVal) continue;
            if (isVec(newVal) && isVec(oldVal) && newVal.equal(oldVal)) continue;
            if (CASH_INDEPENDENT_SHAPE_PROPS.includes(key)) continue;

            return true;
        }
        return false;
    }

    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }

    /**
     * スプライトのセンター位置を得る
     * @returns
     */
    public getCenterPoint() {
        return this.getStartPoint().add(this.prefs.scale.times(0.5));
    }
    protected _moveAnchor(newAnchor: Vec2) {
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

    /**
     * アンカーを移動する
     * @param newAnchor
     * @returns
     */
    public moveAnchor(newAnchor: Vec2): Shape<T> {
        return this.setSpritePrefs(this._moveAnchor(newAnchor));
    }

    private updateCacheImage(cacheContext: AbstractContext2D, auxContext: AbstractContext2D) {
        this.rasterizeFunc(auxContext);

        cacheContext.viewport(this.getMaxSize());
        cacheContext.resetTransform();

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

        const imageCenterPoint = cacheContext.size.times(0.5);
        const imageStartPoint = imageCenterPoint.sub(auxContext.size.times(0.5));

        cacheContext.drawImage(auxContext.getCanvas(), imageStartPoint);
    }

    public updateCache(auxContext: AbstractContext2D) {
        const cachePrefs = {
            anchor: new Vec2(0.5, 0.5),
            globalLocation: this._moveAnchor(new Vec2(0.5, 0.5)).globalLocation,
            rotation: this.prefs.rotation,
            visible: this.prefs.visible,
            blendMode: this.prefs.blendMode,
            opacity: this.prefs.opacity,
            shadowBlur: null,
            shadowColor: null,
            shadowOffset: null,
            scale: this.getMaxSize(),
        };

        this.cache = this.cache?.setDrawConfigs(cachePrefs) ?? new Cache<T>(cachePrefs, null);

        if (!this.needChacheUpdate(this.cache.deps, this.prefs)) {
            return this.cache;
        }

        this.cache.update((context) => {
            this.updateCacheImage(context, auxContext);
        }, this.prefs);

        return this.cache;
    }

    public drawFunc(context: AbstractContext2D, auxContext: AbstractContext2D): void {
        const cache = this.updateCache(auxContext);

        cache.draw(context, auxContext);
    }
    public drawZoomFunc(context: AbstractContext2D, auxContext: AbstractContext2D, zoom: number) {
        const cache = this.updateCache(auxContext);

        cache.drawZoom(context, auxContext, zoom);
    }
}
