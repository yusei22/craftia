import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';
import { Filter } from 'application/filters/Filter';
import { Pen } from 'application/pens/Pen';

export interface RasterizedImagePrefs extends SpritePrefs {}

export class Rasterizedmage extends Sprite<RasterizedImagePrefs> {
    public readonly image: ImageBitmap;

    /**
     * 新しい`Rasterizedmage`スプライトを作成
     * @param image ラスタライズ画像
     * @param prefs 環境設定
     */
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

    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newRasterizedImagePrefs = { ...this.prefs, ...newPrefs };

        return new Rasterizedmage(this.image, newRasterizedImagePrefs);
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

        return new Rasterizedmage(this.image, newPrefs);
    }
    /**
     * 画像をセット
     * @param image 新しい画像
     * @returns 新規`Rasterizedmage`クラス
     */
    public setImage(image: ImageBitmap) {
        return new Rasterizedmage(image, this.prefs);
    }

    /**
     * 画像をリサイズ
     * @param valOrUpdater リサイズ設定の更新関数または値
     * @returns 新規`Rasterizedmage`クラス
     */
    public async setResize(valOrUpdater: ValueUpdater<Vec2> | Vec2) {
        const resizer = new Resizer();
        const resize =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.getImageSize()) : valOrUpdater;

        return new Rasterizedmage(await resizer.resize(this.image, resize), this.prefs);
    }

    /**
     * 最終的な座標はそのままに、アンカーを移動
     * @param newAnchor 新しいアンカー
     * @returns  新規`Rasterizedmage`クラス
     */
    public moveAnchor(newAnchor: Vec2) {
        const AnchorsRelativeDifference = new Vec2(
            (newAnchor.x - this.prefs.anchor.x) * this.image.width,
            (newAnchor.y - this.prefs.anchor.y) * this.image.height
        );
        const newLocation = this.prefs.globalLocation.add(AnchorsRelativeDifference);
        return this.setSpritePrefs({
            ...this.prefs,
            anchor: newAnchor,
            globalLocation: newLocation,
        });
    }
    /**
     * 画像のサイズを得る
     * @returns 画像サイズ
     */
    private getImageSize() {
        return new Vec2(this.image.width, this.image.height);
    }

    /**
     * スプライトワーカーを得る
     * @param workerSource スプライトワーカーソース
     * @returns 新規スプライトワーカー
     */
    public getSpriteWorker(workerSource: Filter | Pen) {
        return workerSource.getWorker(this);
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
        return this.getStartPoint().add(this.getImageSize().times(0.5));
    }
    public drawFunc(context: Context2D) {
        context.drawImage(this.image, this.getStartPoint());
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
    public createStatic() {
        return new Promise<Rasterizedmage>((resolve) => {
            resolve(this);
        });
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
