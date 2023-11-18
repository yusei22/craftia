/**WebGLFramebufferを管理するクラス */
export class GLFrameBuffer {
    /** WebGL2のコンテキスト*/
    private gl: WebGL2RenderingContext;
    /**内包するWebGLFramebuffer */
    private webGLFramebuffer: WebGLFramebuffer | null;

    public updateID: number;

    /**
     * @param gl  WebGL2のコンテキスト
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

    /**既定のフレームバッファを使う */
    public unbind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
    public destroy() {
        this.gl.deleteFramebuffer(this.webGLFramebuffer);
    }
}
