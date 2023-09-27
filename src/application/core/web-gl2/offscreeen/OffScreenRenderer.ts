import { Vec2 } from 'application/core/units';
import { Texture2D, FrameBuffer } from 'application/core/web-gl2';
export class OffscreenRenderer {
    /**レンダラのサイズ*/
    private _size: Vec2;
    /**描画結果保存用テクスチャ */
    private _resultTexture: Texture2D;

    /**webgl2コンテクスト */
    private gl: WebGL2RenderingContext;
    /**フレームバッファ */
    private frameBuffer: FrameBuffer;

    /**
     * @param gl webgl2コンテクスト
     * @param size レンダラのサイズ
     */
    constructor(gl: WebGL2RenderingContext, size: Vec2) {
        this.gl = gl;
        this.frameBuffer = new FrameBuffer(this.gl);
        this._size = size;
        this._resultTexture = new Texture2D(this.gl).attachImage(null, this._size);

        this.activate();
        this._resultTexture.attachToframebuffer();
        this.deactivate();
    }
    public get resultTexture() {
        return this._resultTexture;
    }
    public get size() {
        return this._size;
    }
    public setNewResultTex(size: Vec2) {
        this._size = size;
        this._resultTexture = new Texture2D(this.gl).attachImage(null, this._size);

        this.activate();
        this._resultTexture.attachToframebuffer();
        this.deactivate();
        return this._resultTexture;
    }
    /**フレームブァッファをアクティブに */
    public activate() {
        this.frameBuffer.bind();
    }
    /**フレームブァッファを非アクティブに */
    public deactivate() {
        this.frameBuffer.unbind();
    }
    /**デフォルトのフレームブァッファを使う */
    static removeOffscreenRenderer(gl: WebGL2RenderingContext) {
        FrameBuffer.bindDefaultFrameBuffer(gl);
    }
}
