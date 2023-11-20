import { Cache } from './Cache';
import { Sprite, SpritePrefs } from './Sprite';
import { AbstractContext2D, Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export interface RasterizedImagePrefs extends SpritePrefs {}

export class Rasterizedmage extends Sprite<RasterizedImagePrefs> {
    protected cache: Cache<RasterizedImagePrefs> | null;
    public readonly image: ImageBitmap;

    /**
     * 新しい`Rasterizedmage`スプライトを作成
     * @param image ラスタライズ画像
     * @param prefs 環境設定
     */
    constructor(
        image: ImageBitmap,
        prefs: RasterizedImagePrefs,
        cache: Cache<RasterizedImagePrefs> | null
    ) {
        super(prefs);
        this.image = image;
        this.cache = cache;
    }
    public getMaxSize() {
        return this.getImageResolution().add(new Vec2(this.prefs.shadowBlur || 0).times(2));
    }
    public needChacheUpdate(oldPrefs: RasterizedImagePrefs | null, newPrefs: RasterizedImagePrefs) {
        if (oldPrefs === null) return true;

        if (oldPrefs.shadowBlur !== newPrefs.shadowBlur) return true;
        if (oldPrefs.shadowColor !== newPrefs.shadowColor) return true;
        if (newPrefs.shadowOffset && !oldPrefs.shadowOffset?.equal(newPrefs.shadowOffset))
            return true;

        return false;
    }
    public needCache() {
        if (this.prefs.shadowBlur && this.prefs.shadowBlur > 0) return true;

        return false;
    }

    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rasterizedmage(this.image, newRasterizedImagePrefs, this.cache);
    }

    /**
     * ラスタライズ画像スプライト固有の環境設定をセットする
     * @param valOrUpdater  更新関数または新規スプライト環境設定
     * @returns 新しいスプライト
     */
    public setRasterizedmagePrefs(
        valOrUpdater: ValueUpdater<RasterizedImagePrefs> | RasterizedImagePrefs
    ) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        return new Rasterizedmage(this.image, newPrefs, this.cache);
    }
    /**
     * 画像をセット
     * @param image 新しい画像
     * @returns 新規`Rasterizedmage`クラス
     */
    public setImage(image: ImageBitmap) {
        return new Rasterizedmage(image, this.prefs, this.cache);
    }

    /**
     * 画像をリサイズ
     * @param valOrUpdater リサイズ設定の更新関数または値
     * @returns 新規`Rasterizedmage`クラス
     */
    public async setResize(valOrUpdater: ValueUpdater<Vec2> | Vec2) {
        const resizer = new Resizer();
        const resize =
            typeof valOrUpdater === 'function'
                ? valOrUpdater(this.getImageResolution())
                : valOrUpdater;

        return new Rasterizedmage(await resizer.resize(this.image, resize), this.prefs, this.cache);
    }

    protected _moveAnchor(newAnchor: Vec2) {
        const AnchorsRelativeDifference = new Vec2(
            (newAnchor.x - this.prefs.anchor.x) * this.image.width,
            (newAnchor.y - this.prefs.anchor.y) * this.image.height
        );
        const newLocation = this.prefs.globalLocation.add(AnchorsRelativeDifference);
        return {
            ...this.prefs,
            anchor: newAnchor,
            globalLocation: newLocation,
        };
    }

    /**
     * 最終的な座標はそのままに、アンカーを移動
     * @param newAnchor 新しいアンカー
     * @returns  新規`Rasterizedmage`クラス
     */
    public moveAnchor(newAnchor: Vec2) {
        return this.setSpritePrefs(this._moveAnchor(newAnchor));
    }

    /**
     * 画像のサイズを得る
     * @returns 画像サイズ
     */
    private getImageResolution() {
        return new Vec2(this.image.width, this.image.height);
    }

    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.image.width,
            this.prefs.anchor.y * this.image.height
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }

    /**
     * スプライトのセンター位置を得る
     * @returns
     */
    public getCenterPoint() {
        return this.getStartPoint().add(this.getImageResolution().times(0.5));
    }

    private updateCacheImage(cacheContext: AbstractContext2D) {
        cacheContext.viewport(this.getMaxSize());
        cacheContext.resetTransform();

        const imageCenterPoint = cacheContext.size.times(0.5);
        const imageStartPoint = imageCenterPoint.sub(this.getImageResolution().times(0.5));

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

        cacheContext.drawImage(this.image, imageStartPoint);
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
            this.cache?.setDrawConfigs(cachePrefs) ??
            new Cache<RasterizedImagePrefs>(cachePrefs, null);

        if (this.needChacheUpdate(this.cache.deps, this.prefs)) {
            return this.cache;
        }

        this.cache.update((context) => {
            this.updateCacheImage(context);
        }, this.prefs);

        return this.cache;
    }

    public drawFunc(context: AbstractContext2D, auxContext: AbstractContext2D) {
        if (this.needCache()) {
            const cache = this.updateCache();
            cache.draw(context, auxContext);
        } else {
            this.drawFuncWithoutCache(context);
        }
    }
    public drawZoomFunc(
        context: AbstractContext2D,
        auxContext: AbstractContext2D,
        zoom: number
    ): void {
        if (this.needCache()) {
            const cache = this.updateCache();
            cache.drawZoom(context, auxContext, zoom);
        } else {
            this.drawZoomFuncWithoutCache(context, zoom);
        }
    }

    protected drawFuncWithoutCache(context: AbstractContext2D) {
        this.setconfig(context, {
            line: null,
            shadow: {
                shadowBlur: this.prefs.shadowBlur,
                shadowColor: this.prefs.shadowColor,
                shadowOffset: this.prefs.shadowOffset,
            },
            text: null,
            fillStyle: null,
            globalAlpha: this.prefs.opacity,
            globalCompositeOperation: this.prefs.blendMode,
            strokeStyle: null,
        });
        context.drawImage(this.image, this.getStartPoint());
    }

    public drawZoomFuncWithoutCache(context: AbstractContext2D, zoom: number) {
        const _scale = this.getImageResolution().times(zoom);
        const _location = this.prefs.globalLocation.times(zoom);

        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * _scale.x,
            this.prefs.anchor.y * _scale.y
        );
        const _startPoint = _location.sub(anchorRerativeLoc);

        this.setconfig(context, {
            line: null,
            shadow: {
                shadowBlur: this.prefs.shadowBlur ? this.prefs.shadowBlur * zoom : null,
                shadowColor: this.prefs.shadowColor,
                shadowOffset: this.prefs.shadowOffset,
            },
            text: null,
            fillStyle: null,
            globalAlpha: this.prefs.opacity,
            globalCompositeOperation: this.prefs.blendMode,
            strokeStyle: null,
        });

        context.drawImage(this.image, _startPoint, _scale);
    }
    public createStatic() {
        return new Promise<Rasterizedmage>((resolve) => {
            resolve(this);
        });
    }

    public copy() {
        return new Rasterizedmage(this.image, this.prefs, null);
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
