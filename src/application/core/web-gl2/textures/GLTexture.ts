import { Vec2 } from 'application/core/units';

/** テクスチャ画像の仕様・オプション */
export type TexOptions = {
    /** 最大のミップ */
    level?: number;
    /**テクスチャの形式 */
    internalformat?: GLenum;
    /**データの形式 */
    format?: GLenum;
    /**データの種類 */
    type?: GLenum;
    /**使用するテクスチャユニット */
    unitNumber?: number;
    /**境界線の幅。0 である必要がある。 */
    border?: number;
};

/**テクスチャに使用できる画像ののピクセルソース*/
export type TexImageSource =
    | OffscreenCanvas
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap
    | ImageData;

/** テクスチャに使用できる型付き配列のピクセルソース*/
export type TexTypedArray = Uint8Array | Uint16Array | Uint32Array | Float32Array | null;

/**テクスチャに利用できるピクセルソース */
export type TexPixcels = TexImageSource | TexTypedArray;

export type TexPixcelsOptions = {
    enableNPOT?: boolean;
    repeat?: boolean;
    yCoordinateInversion?: boolean;
};

/**
 * WegGLの型付き配列テクスチャを管理するクラス。
 */
export class GLTexture {
    public updateID: number;

    /**WebGL2のコンテキスト */
    public readonly gl: WebGL2RenderingContext;
    /**内包する`WebGLTexture` */
    private readonly webGLTexture: WebGLTexture;

    /**現在のユニット番号 */
    private _unitNumber: number;
    /**現在のサイズ */
    private _size: Vec2 = new Vec2(0, 0);

    /** 最大のミップ */
    public readonly level: number;
    /**テクスチャの形式 */
    public readonly internalformat: GLenum;
    /**データの形式 */
    public readonly format: GLenum;
    /**データの種類 */
    public readonly type: GLenum;
    /**境界線の幅。0 である必要がある。 */
    public readonly border: number = 0;

    public get size() {
        return this._size;
    }
    public get unitNumber() {
        return this._unitNumber;
    }
    constructor(
        gl: WebGL2RenderingContext,
        {
            level = 0,
            internalformat = gl.RGBA,
            format = gl.RGBA,
            type = gl.UNSIGNED_BYTE,
            unitNumber = 0,
            border = 0,
        }: TexOptions = {}
    ) {
        this.gl = gl;
        this.webGLTexture = this.gl.createTexture() as WebGLTexture;
        this.level = level;
        this.internalformat = internalformat;
        this.format = format;
        this.type = type;
        this._unitNumber = unitNumber;
        this.border = border;

        this.updateID = 0;
    }
    public bind() {
        this.gl.activeTexture(this.gl.TEXTURE0 + this._unitNumber);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.webGLTexture);
        return this;
    }
    /**
     * 保持しているユニット番号のテクスチャに`null`を登録
     */
    public unbind() {
        this.gl.activeTexture(this.gl.TEXTURE0 + this._unitNumber);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        return this;
    }

    /**
     * ユニット番号を変更
     * @param number 新しいユニット番号
     */
    public changeUnitNumber(number: number) {
        if (number === this._unitNumber) {
            return;
        }
        this.unbind();
        this._unitNumber = number;
    }
    /**
     * テクスチャに画像を転送
     * @param pixcels 転送する画像
     * @param size テクスチャのサイズ
     * @param param2
     * @param param2.enableNPOT 二乗サイズの画像以外も使えるようにするか
     * @param param2.repeat 画像を繰り返すか
     * @param param2.yCoordinateInversion 画像の上下を反転するか
     */
    public attachImage(
        pixcels: TexPixcels,
        size: Vec2,
        { enableNPOT = true, repeat = false, yCoordinateInversion = false }: TexPixcelsOptions = {}
    ) {
        this._size = size;
        this.bind();

        if (ArrayBuffer.isView(pixcels) || pixcels === null) {
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                this.level,
                this.internalformat,
                this._size.x,
                this._size.y,
                this.border,
                this.format,
                this.type,
                pixcels
            );
        } else {
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                this.level,
                this.internalformat,
                this._size.x,
                this._size.y,
                this.border,
                this.format,
                this.type,
                pixcels
            );
        }

        if (enableNPOT) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        }

        if (!repeat) {
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.gl.CLAMP_TO_EDGE
            );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.gl.CLAMP_TO_EDGE
            );
        }

        if (yCoordinateInversion) {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        }

        this.unbind();
        return this;
    }

    /**
     * フレームバッファに紐づけ
     * @param attachmentPoint texture の装着ポイントを指定
     * - `gl.COLOR_ATTACHMENT0` 色バッファ
     * - `gl.DEPTH_ATTACHMENT` 深度バッファー
     * - `gl.STENCIL_ATTACHMENT` ステンシルバッファー
     */
    public attachToframebuffer(attachmentPoint: GLenum = this.gl.COLOR_ATTACHMENT0) {
        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            attachmentPoint,
            this.gl.TEXTURE_2D,
            this.webGLTexture,
            this.level
        );
        return this;
    }
    public destroy() {
        this.gl.deleteTexture(this.webGLTexture);
    }
}
