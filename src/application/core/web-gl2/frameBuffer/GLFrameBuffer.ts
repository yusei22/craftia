/**
 * WebGLFramebufferのラッパー
 */
export class GLFrameBuffer {
    /** WebGL2Context*/
    private gl: WebGL2RenderingContext;
    /**ラップするWebGLFramebuffer */
    private webGLFramebuffer: WebGLFramebuffer | null;

    public updateID: number;

    /**
     * GLFrameBufferを作成する
     * @param gl  WebGL2Context
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.webGLFramebuffer = this.gl.createFramebuffer();
        this.updateID = 0;
    }

    /**バインドする */
    public bind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.webGLFramebuffer);
    }

    /**
     * フレームバッファを破棄する
     */
    public destroy() {
        this.gl.deleteFramebuffer(this.webGLFramebuffer);
    }

    /**
     * フレームバッファをアンバインドする
     * @param gl WebGL2Context
     */
    static unbind(gl: WebGL2RenderingContext) {
        gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null);
    }
}
