import { Vec2 } from 'application/core/units';
import { Texture2D, FrameBuffer } from 'application/core/web-gl2';
export class OffscreenRenderer {
    /**描画結果保存用テクスチャ */
    readonly resultTexture: Texture2D;
    /**レンダラのサイズ*/
    readonly size: Vec2;
    /**webgl2コンテクスト */
    readonly gl: WebGL2RenderingContext;
    /**フレームバッファ */
    private frameBuffer: FrameBuffer;

    /**
     * @param gl webgl2コンテクスト
     * @param size レンダラのサイズ
     */
    constructor(gl: WebGL2RenderingContext, size: Vec2) {
        this.gl = gl;
        this.size = size;
        this.frameBuffer = new FrameBuffer(this.gl);
        this.resultTexture = new Texture2D(this.gl);
        this.resultTexture.attachImage(null, this.size);

        //描画結果保存用テクスチャを紐づける
        this.activate();
        this.resultTexture.attachToframebuffer();
        this.deactivate();
    }
    /**フレームブァッファをアクティブに */
    public activate() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
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
