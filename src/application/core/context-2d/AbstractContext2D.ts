import { AtLeastArray } from '../types';
import { Vec, Vec2 } from 'application/core/units';

export type Context2DAttr =
    | 'fillStyle'
    | 'font'
    | 'globalAlpha'
    | 'globalCompositeOperation'
    | 'imageSmoothingEnabled'
    | 'lineCap'
    | 'lineDashOffset'
    | 'lineJoin'
    | 'lineWidth'
    | 'miterLimit'
    | 'shadowBlur'
    | 'shadowColor'
    | 'shadowOffsetX'
    | 'shadowOffsetY'
    | 'strokeStyle'
    | 'textAlign'
    | 'textBaseline';

export type Repetition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';

export type Context2DValue<T extends Context2DAttr> = CanvasRenderingContext2D[T];

export type Context2DMap = {
    [K in Context2DAttr]: Context2DValue<K>;
};

export type ContextShadowConfig = {
    readonly shadowBlur: number | null;
    readonly shadowColor: string | null;
    readonly shadowOffset: Vec2 | null;
};

export type ContextLineConfig = {
    /**線の端点*/
    readonly lineCap: CanvasLineCap | null;
    /**破線のオフセット */
    readonly lineDashOffset: number | null;
    /**線接合の形状 */
    readonly lineJoin: CanvasLineJoin | null;
    /**線の太さ */
    readonly lineWidth: number | null;
};
export type ContextTextConfig = {
    readonly font: string | null;
    readonly textAlign: CanvasTextAlign | null;
    readonly textBaseline: CanvasTextBaseline | null;
};

export type Context2DCreateOptions<
    T extends CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
> = CanvasRenderingContext2DSettings & {
    context?: T;
};

export const CONTEXT_ATTRS_DEFAULT: Context2DMap = {
    fillStyle: '#000',
    font: '10px serif',
    globalAlpha: 1.0,
    globalCompositeOperation: 'source-over',
    imageSmoothingEnabled: true,
    lineCap: 'butt',
    lineDashOffset: 0.0,
    lineJoin: 'miter',
    lineWidth: 1.0,
    miterLimit: 10.0,
    shadowBlur: 0,
    shadowColor: '#0000',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: '#000',
    textAlign: 'start',
    textBaseline: 'alphabetic',
} as const;

export abstract class AbstractContext2D<
    T extends CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D =
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D,
> {
    protected context: T;

    constructor(context: T) {
        this.context = context;
        return;
    }
    /**
     * キャンバスのサイズ
     */
    public get size(): Vec2 {
        return new Vec2(this.context.canvas.width, this.context.canvas.height);
    }
    public abstract getCanvas(): T extends CanvasRenderingContext2D
        ? HTMLCanvasElement
        : OffscreenCanvas;
    /**
     * canvasをリサイズ
     * @param size 大きさ
     */
    public viewport(size: Vec2): this {
        const _size = size.round();
        this.context.canvas.width = Math.max(_size.x, 1);
        this.context.canvas.height = Math.max(_size.y, 1);
        return this;
    }
    /**
     * canvasをクリア
     */
    public clear(): this {
        this.resetTransform();
        this.clearRect(new Vec2(0, 0), this.size);
        return this;
    }
    /**
     * 円弧を描画
     * @param centerPoint 中心位置
     * @param radius 半径
     * @param startAngle 開始角度
     * @param endAngle 終了角度
     * @param counterclockwise 反時計回りか
     */
    public arc(
        centerPoint: Vec2,
        radius: number,
        startAngle: number,
        endAngle: number,
        counterclockwise?: boolean
    ): this {
        this.context.arc(
            centerPoint.x,
            centerPoint.y,
            radius,
            startAngle,
            endAngle,
            counterclockwise
        );
        return this;
    }
    /**
     * 円弧を描画
     * @param startPoint 開始位置
     * @param endPoint 終了位置
     * @param radius 半径
     */
    public arcTo(startPoint: Vec2, endPoint: Vec2, radius: number): this {
        this.context.arcTo(startPoint.x, startPoint.y, endPoint.x, endPoint.y, radius);
        return this;
    }
    /**
     * 新しいパスの描画開始
     */
    public beginPath(): this {
        this.context.beginPath();
        return this;
    }
    /**
     * ベジェ 曲線を追加
     * @param startPoint 始点
     * @param middlePoint 真ん中の点
     * @param endPoint 終点
     */
    public bezierCurveTo(startPoint: Vec2, middlePoint: Vec2, endPoint: Vec2): this {
        this.context.bezierCurveTo(
            startPoint.x,
            startPoint.y,
            middlePoint.x,
            middlePoint.y,
            endPoint.x,
            endPoint.y
        );
        return this;
    }
    /**
     * 長方形領域内のピクセルを透明な黒に設定
     * @param startPoint 位置
     * @param size サイズ
     */
    public clearRect(startPoint: Vec2, size: Vec2): this {
        this.context.clearRect(startPoint.x, startPoint.y, size.x, size.y);
        return this;
    }
    /**
     * 在または指定されたパスを現在のクリッピング領域に変換
     * @param path クリッピング領域として使用するパス
     * @param fillRule クリッピングアルゴリズム
     */
    public clip(path: Path2D, fillRule?: CanvasFillRule): this;
    public clip(fillRule?: CanvasFillRule): this;
    public clip(a?: Path2D | CanvasFillRule, b?: CanvasFillRule): this {
        if (a instanceof Path2D) {
            this.context.clip(a, b);
            return this;
        } else {
            this.context.clip(a);
            return this;
        }
    }
    /**
     * 線形グラデーションを作成
     * @param startPoint 始点
     * @param endPoint 終点
     */
    public createLinearGradient(startPoint: Vec2, endPoint: Vec2): CanvasGradient {
        return this.context.createLinearGradient(
            startPoint.x,
            startPoint.y,
            endPoint.x,
            endPoint.y
        );
    }
    /**
     * 円形グラデーションを作成
     * @param startPoint 始点となる円の座標
     * @param startRound 始点となる円のサイズ
     * @param endPoint 終点となる円の座標
     * @param endRound 終点となる円のサイズ
     */
    public createRadialGradient(
        startPoint: Vec2,
        startRound: number,
        endPoint: Vec2,
        endRound: number
    ): CanvasGradient {
        return this.context.createRadialGradient(
            startPoint.x,
            startPoint.y,
            startRound,
            endPoint.x,
            endPoint.y,
            endRound
        );
    }
    /**
     * 画像と繰り返しを使用してパターンを作成(適用はされない)
     * @param image 画像
     * @param repetition 繰り返しのスタイル
     */
    public createPattern(image: CanvasImageSource, repetition: Repetition): CanvasPattern | null {
        return this.context.createPattern(image, repetition);
    }
    /**
     * 現在のパスを閉じる
     */
    public closePath(): this {
        this.context.closePath();
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
     * 楕円を描く
     * @param centerPoint 位置
     * @param radius 縦横の半径
     * @param rotation 回転
     * @param startAngle 開始角度
     * @param endAngle 終了角度
     * @param counterclockwise 反時計周りか
     */
    public ellipse(
        centerPoint: Vec2,
        radius: Vec2,
        rotation: number,
        startAngle: number,
        endAngle: number,
        counterclockwise?: boolean
    ): this {
        this.context.ellipse(
            centerPoint.x,
            centerPoint.y,
            radius.x,
            radius.y,
            rotation,
            startAngle,
            endAngle,
            counterclockwise
        );
        return this;
    }
    /**
     * 現在のパスまたは指定されたパスを埋める
     * @param path パス
     * @param fillRule 塗りつぶしアルゴリズム
     */
    public fill(path: Path2D, fillRule?: CanvasFillRule): this;
    public fill(fillRule?: CanvasFillRule): this;
    public fill(a?: Path2D | CanvasFillRule, b?: CanvasFillRule): this {
        if (a instanceof Path2D) {
            this.context.fill(a, b);
            return this;
        } else {
            this.context.fill(a);
            return this;
        }
    }
    /**
     * 長方形塗りつぶし
     * @param startPoint 開始位置
     * @param size サイズ
     */
    public fillRect(startPoint: Vec2, size: Vec2): this {
        this.context.fillRect(startPoint.x, startPoint.y, size.x, size.y);
        return this;
    }
    /**
     * テキストを描画
     * @param text テキスト
     * @param startPoint 開始位置
     * @param maxWidth 最大横幅
     */
    public fillText(text: string, startPoint: Vec2, maxWidth?: number): this {
        this.context.fillText(text, startPoint.x, startPoint.y, maxWidth);
        return this;
    }
    /**
     * `ImageData`を得る
     * @param startPoint 取得開始位置
     * @param size 取得サイズ
     * @returns 取得した`ImageData`
     */
    public getImageData(startPoint: Vec2, size: Vec2): ImageData {
        return this.context.getImageData(startPoint.x, startPoint.y, size.x, size.y);
    }
    /**
     * 現在の破線パターンを取得
     * @returns
     */
    public getLineDash(): number[] {
        return this.context.getLineDash();
    }
    /**
     * 現在の変換行列を取得
     * @returns オブジェクト`DOMMatrix`
     */
    public getTransform(): DOMMatrix {
        return this.context.getTransform();
    }
    /**
     * 指定されたポイントが現在のパスに含まれているかどうかを取得
     * @param path パス
     * @param location 位置
     * @param fillRule 塗りつぶしアルゴリズム
     */
    public isPointInPath(path: Path2D, location: Vec2, fillRule?: CanvasFillRule): boolean;
    public isPointInPath(location: Vec2, fillRule?: CanvasFillRule): boolean;
    public isPointInPath(a: Vec2 | Path2D, b?: CanvasFillRule | Vec2, c?: CanvasFillRule): boolean {
        if (a instanceof Path2D && b instanceof Vec2) {
            return this.context.isPointInPath(a, b.x, b.y, c);
        }
        if (a instanceof Vec2 && (typeof b === 'string' || typeof b === 'undefined')) {
            return this.context.isPointInPath(a.x, a.y, b);
        }
        return false;
    }
    /**
     * 指定された点がパスのストロークに含まれる領域内にあるかどうかを取得
     * @param path パス
     * @param location 位置
     */
    public isPointInStroke(path: Path2D, location: Vec2): boolean;
    public isPointInStroke(location: Vec2): boolean;
    public isPointInStroke(a: Path2D | Vec2, b?: Vec2): boolean {
        if (a instanceof Vec2) {
            return this.context.isPointInStroke(a.x, a.y);
        }
        if (a instanceof Path2D && b) {
            return this.context.isPointInStroke(a, b.x, b.y);
        }
        return false;
    }
    /**
     * 現在のサブパスに直線を追加
     * @param point 位置
     */
    public lineTo(point: Vec2): this {
        this.context.lineTo(point.x, point.y);
        return this;
    }
    /**
     * 測定されたテキストに関する情報を得る
     * @param text テキスト
     * @returns オブジェクト`TextMetrics`
     */
    public measureText(text: string): TextMetrics {
        return this.context.measureText(text);
    }
    /**
     * 新しいサブパスを開始
     * @param point 位置
     */
    public moveTo(point: Vec2): this {
        this.context.moveTo(point.x, point.y);
        return this;
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
     * 現在のサブパスに二次 ベジェ 曲線を追加
     * @param controlPoint 制御位置
     * @param endPoint 終点
     */
    public quadraticCurveTo(controlPoint: Vec2, endPoint: Vec2): this {
        this.context.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
        return this;
    }
    /**
     * 矩形
     * @param startPoint 位置
     * @param size サイズ
     */
    public rect(startPoint: Vec, size: Vec2): this {
        this.context.rect(startPoint.x, startPoint.y, size.x, size.y);
        return this;
    }
    /**
     * 変換行列を単位行列にリセット
     */
    public resetTransform(): this {
        this.context.resetTransform();
        return this;
    }
    /**
     * 最後に保存されたキャンバス状態を復元
     */
    public restore(): this {
        this.context.restore();
        return this;
    }
    /**
     * 変換行列に回転を追加
     * @param angle
     */
    public rotate(angle: number): this {
        this.context.rotate(angle);
        return this;
    }
    /**
     * 角丸の矩形
     * @param startPoint 始点位置
     * @param size サイズ
     * @param radii 角丸半径
     */
    public roundRect(
        startPoint: Vec,
        size: Vec2,
        radii: AtLeastArray<4, number> = [0, 0, 0, 0]
    ): this {
        const y = startPoint.y;
        const x = startPoint.x;
        const w = size.x;
        const h = size.y;
        const r = radii;

        this.context.beginPath();
        this.context.moveTo(x + r[3], y);

        this.context.lineTo(x + w - r[0], y);
        this.context.arc(x + w - r[0], y + r[0], r[0], Math.PI * (3 / 2), 0, false);

        this.context.lineTo(x + w, y + h - r[1]);
        this.context.arc(x + w - r[1], y + h - r[1], r[1], 0, Math.PI * (1 / 2), false);

        this.context.lineTo(x + r[2], y + h);
        this.context.arc(x + r[2], y + h - r[2], r[2], Math.PI * (1 / 2), Math.PI, false);

        this.context.lineTo(x, y + r[3]);
        this.context.arc(x + r[3], y + r[3], r[3], Math.PI, Math.PI * (3 / 2), false);

        this.context.closePath();
        return this;
    }
    /**
     * 現在の状態をスタックにプッシュ
     */
    public save(): this {
        this.context.save();
        return this;
    }
    /**
     * コンテキストのプロパティをセット
     * @param attr プロパティのインデックス
     * @param val セットする値
     */
    public setAttr<U extends Context2DAttr>(attr: U, val: T[U]): this {
        this.context[attr] = val;
        return this;
    }
    /**
     * スケーリング変換行列を追加
     * @param magnification
     */
    public scale(magnification: Vec2): this {
        this.context.scale(magnification.x, magnification.y);
        return this;
    }
    /**
     * ストロークするときに使用される破線パターンを設定
     * @param segments 線とギャップを交互に描画する距離
     */
    public setLineDash(segments: Iterable<number>): this {
        this.context.setLineDash(segments);
        return this;
    }
    /**
     * 変換行列を設定
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     * @param f
     */
    public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): this {
        this.context.setTransform(a, b, c, d, e, f);
        return this;
    }
    /**
     * 枠を描画
     * @param path パス
     */
    public stroke(path?: Path2D): this {
        if (path) {
            this.context.stroke(path);
        } else {
            this.context.stroke();
        }
        return this;
    }
    /**
     * 矩形の枠線描画
     * @param startPoint 開始位置
     * @param size サイズ
     */
    public strokeRect(startPoint: Vec2, size: Vec2): this {
        this.context.strokeRect(startPoint.x, startPoint.y, size.x, size.y);
        return this;
    }
    /**
     * テキストの枠線描画
     * @param text テキスト
     * @param startPoint 開始位置
     * @param maxWidth 最大横幅
     */
    public strokeText(text: string, startPoint: Vec2, maxWidth?: number): this {
        this.context.strokeText(text, startPoint.x, startPoint.y, maxWidth);
        return this;
    }
    /**
     * 変換行列を乗算
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     * @param f
     */
    public transform(a: number, b: number, c: number, d: number, e: number, f: number): this {
        this.context.transform(a, b, c, d, e, f);
        return this;
    }
    /**
     * 平行移動変換行列追加
     * @param translate 移動量
     */
    public translate(translate: Vec2): this {
        this.context.translate(translate.x, translate.y);
        return this;
    }
    /**
     * 影を設定
     * @param shadowConfig 影の設定情報(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setShadowConfig(shadowConfig: ContextShadowConfig | null): this {
        if (shadowConfig === null) {
            this.setAttr('shadowColor', CONTEXT_ATTRS_DEFAULT.shadowColor);
            this.setAttr('shadowBlur', CONTEXT_ATTRS_DEFAULT.shadowBlur);
            this.setAttr('shadowOffsetX', CONTEXT_ATTRS_DEFAULT.shadowOffsetX);
            this.setAttr('shadowOffsetY', CONTEXT_ATTRS_DEFAULT.shadowOffsetY);
            return this;
        }

        this.setAttr('shadowColor', shadowConfig.shadowColor ?? CONTEXT_ATTRS_DEFAULT.shadowColor);
        this.setAttr('shadowBlur', shadowConfig.shadowBlur ?? CONTEXT_ATTRS_DEFAULT.shadowBlur);
        this.setAttr(
            'shadowOffsetX',
            shadowConfig.shadowOffset?.x ?? CONTEXT_ATTRS_DEFAULT.shadowOffsetX
        );
        this.setAttr(
            'shadowOffsetY',
            shadowConfig.shadowOffset?.y ?? CONTEXT_ATTRS_DEFAULT.shadowOffsetY
        );
        return this;
    }
    /**
     * ラインを設定
     * @param lineConfig ラインの設定情報(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setLineConfig(lineConfig: ContextLineConfig | null): this {
        if (lineConfig === null) {
            this.setAttr('lineCap', CONTEXT_ATTRS_DEFAULT.lineCap);
            this.setAttr('lineDashOffset', CONTEXT_ATTRS_DEFAULT.lineDashOffset);
            this.setAttr('lineJoin', CONTEXT_ATTRS_DEFAULT.lineJoin);
            this.setAttr('lineWidth', CONTEXT_ATTRS_DEFAULT.lineWidth);
            return this;
        }
        this.setAttr('lineCap', lineConfig.lineCap ?? CONTEXT_ATTRS_DEFAULT.lineCap);
        this.setAttr(
            'lineDashOffset',
            lineConfig.lineDashOffset ?? CONTEXT_ATTRS_DEFAULT.lineDashOffset
        );
        this.setAttr('lineJoin', lineConfig.lineJoin ?? CONTEXT_ATTRS_DEFAULT.lineJoin);
        this.setAttr('lineWidth', lineConfig.lineWidth ?? CONTEXT_ATTRS_DEFAULT.lineWidth);
        return this;
    }
    /**
     * テキストを設定
     * @param textConfig テキストの設定情報(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setTextConfig(textConfig: ContextTextConfig | null): this {
        if (textConfig === null) {
            this.setAttr('font', CONTEXT_ATTRS_DEFAULT.font);
            this.setAttr('textAlign', CONTEXT_ATTRS_DEFAULT.textAlign);
            this.setAttr('textBaseline', CONTEXT_ATTRS_DEFAULT.textBaseline);
            return this;
        }
        this.setAttr('font', textConfig.font ?? CONTEXT_ATTRS_DEFAULT.font);
        this.setAttr('textAlign', textConfig.textAlign ?? CONTEXT_ATTRS_DEFAULT.textAlign);
        this.setAttr('textBaseline', textConfig.textBaseline ?? CONTEXT_ATTRS_DEFAULT.textBaseline);
        return this;
    }
    /**
     * 塗りつぶしのスタイルを設定
     * @param fillStyle 塗りつぶしスタイル(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setFillStyle(fillStyle: string | CanvasGradient | CanvasPattern | null): this {
        if (fillStyle === null) {
            this.setAttr('fillStyle', CONTEXT_ATTRS_DEFAULT.fillStyle);
            return this;
        }
        this.setAttr('fillStyle', fillStyle);
        return this;
    }
    /**
     * 透明度を指定
     * @param globalAlpha 透明度(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setGlobalAlpha(globalAlpha: number | null): this {
        if (globalAlpha === null) {
            this.setAttr('globalAlpha', CONTEXT_ATTRS_DEFAULT.globalAlpha);
            return this;
        }
        this.setAttr('globalAlpha', globalAlpha);
        return this;
    }
    /**
     * ブレンドモードを設定
     * @param value ブレンドモード(`null`をセットするとデフォルト値が使用される)
     * @returns
     */
    public setGlobalCompositeOperation(value: GlobalCompositeOperation | null): this {
        if (value === null) {
            this.setAttr(
                'globalCompositeOperation',
                CONTEXT_ATTRS_DEFAULT.globalCompositeOperation
            );
            return this;
        }
        this.setAttr('globalCompositeOperation', value);
        return this;
    }
    /**
     * 枠線のスタイルを設定
     * @param value 枠線のスタイル
     * @returns
     */
    public setStrokeStyle(value: string | CanvasGradient | CanvasPattern | null): this {
        if (value === null) {
            this.setAttr('strokeStyle', CONTEXT_ATTRS_DEFAULT.strokeStyle);
            return this;
        }
        this.setAttr('strokeStyle', value);
        return this;
    }
}
