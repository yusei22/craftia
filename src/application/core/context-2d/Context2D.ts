import { Vec2 } from 'application/core/units';
import { ShadowPrefs } from 'application/preferences';
class Context2D {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    constructor() {
        [this.canvas, this.context] = createCanvasAndContext2D();
    }
    /**
     * キャンバスのサイズ
     */
    public get size() {
        return new Vec2(this.canvas.width, this.canvas.height);
    }
    public getCanvas() {
        return this.canvas;
    }
    /**
     * canvasをリサイズ
     * @param size 大きさ
     */
    public viewport(size: Vec2): this {
        this.context.canvas.width = Math.max(size.x, 1);
        this.context.canvas.height = Math.max(size.y, 1);
        return this;
    }
    /**
     * canvasをクリア
     */
    public clear(): this {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        return this;
    }
    /**
     * コンテキストのプロパティをセット
     * @param attr プロパティのインデックス
     * @param val セットする値
     */
    public setAttr<T extends keyof CanvasRenderingContext2D>(attr: T, val: CanvasRenderingContext2D[T]) {
        this.context[attr] = val;
        return this;
    }
    /**
     * 画像描画
     * @param souce 画像ソース
     * @param location 描画位置
     */
    public drawImage(souce: CanvasImageSource, location: Vec2): this;
    public drawImage(souce: CanvasImageSource, location: Vec2, resize: Vec2): this;
    public drawImage(
        souce: CanvasImageSource,
        croppingLocation: Vec2,
        croppingSize: Vec2,
        location: Vec2,
        resize: Vec2
    ): void;

    public drawImage(souce: CanvasImageSource, a: Vec2, b?: Vec2, c?: Vec2, d?: Vec2): this {
        if (!isDrawableSource(souce)) {
            console.error('Unable to draw image.');
            return this;
        }
        if (b && c && d) {
            this.context.drawImage(souce, a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
        } else if (b) {
            this.context.drawImage(souce, a.x, a.y, b.x, b.y);
        } else {
            this.context.drawImage(souce, a.x, a.y);
        }
        return this;
    }
    /**
     * `ImageData`を得る
     * @param location 取得開始位置
     * @param size 取得サイズ
     * @returns 取得した`ImageData`
     */
    public getImageData(location: Vec2, size: Vec2): ImageData {
        return this.context.getImageData(location.x, location.y, size.x, size.y);
    }
    /**
     * イメージデータを挿入
     * @param imageData 挿入する`ImageData`
     * @param location 挿入位置
     */
    public putImageData(imageData: ImageData, location: Vec2): this;
    public putImageData(
        imageData: ImageData,
        location: Vec2,
        croppingLocation: Vec2,
        croppingSize: Vec2
    ): this;
    public putImageData(
        imageData: ImageData,
        location: Vec2,
        croppingLocation?: Vec2,
        croppingSize?: Vec2
    ): this {
        if (croppingLocation && croppingSize) {
            this.context.putImageData(
                imageData,
                location.x,
                location.y,
                croppingLocation.x,
                croppingLocation.y,
                croppingSize.x,
                croppingSize.y
            );
        } else {
            this.context.putImageData(imageData, location.x, location.y);
        }
        return this;
    }
    /**
     * ブレンドモードを指定
     * @param blendMode ブレンドモード
     */
    public setBlendMode(blendMode: GlobalCompositeOperation) {
        this.setAttr('globalCompositeOperation', blendMode);
        return this;
    }
    /**
     * 透明度を指定
     * @param opacity 透明度
     */
    public setOpacity(opacity: number) {
        this.setAttr('globalAlpha', opacity);
        return this;
    }
    /**
     * 影の設定をセット
     * @param shadowPrefs 影の環境設定
     */
    public setShadow(shadowPrefs: ShadowPrefs | null) {
        if (shadowPrefs === null) {
            this.setAttr('shadowColor', `rgba(0,0,0,0)`);
            this.setAttr('shadowBlur', 0);
            this.setAttr('shadowOffsetX', 0);
            this.setAttr('shadowOffsetY', 0);
        } else {
            const color = shadowPrefs.color;
            this.setAttr('shadowColor', `rgba(${color.x},${color.y},${color.z},${color.w})`);
            this.setAttr('shadowOffsetX', shadowPrefs.shadowOffset.x);
            this.setAttr('shadowOffsetY', shadowPrefs.shadowOffset.y);
            this.setAttr('shadowBlur', shadowPrefs.shadowBlur);
        }
        return this;
    }
    /**
     * canvas描画内容のデータURLをエクスポート
     * @returns データURL
     */
    public toDataURL() {
        return this.getCanvas().toDataURL();
    }
}

function createCanvasAndContext2D(): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) {
        throw Error('Failed to get context 2D.');
    }
    return [canvas, context];
}

function isDrawableSource(source: CanvasImageSource): boolean {
    if (source instanceof VideoFrame) {
        if (source.codedWidth > 0 && source.codedHeight > 0) return true;
    } else if (source instanceof SVGImageElement) {
        if (source.width.animVal.value > 0 && source.height.animVal.value > 0) return true;
    } else {
        if (source.width > 0 && source.height > 0) return true;
    }
    return false;
}

export { Context2D };
