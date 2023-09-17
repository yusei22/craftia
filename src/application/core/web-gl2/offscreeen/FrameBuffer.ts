/**WebGLFramebufferを管理するクラス */
class FrameBuffer {
    /** WebGL2のコンテキスト*/
    readonly gl: WebGL2RenderingContext;
    /**内包するWebGLFramebuffer */
    readonly webGLFramebuffer: WebGLFramebuffer | null;

    /**
     * @param gl  WebGL2のコンテキスト
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.webGLFramebuffer = this.gl.createFramebuffer();
    }

    /**バインドする */
    bind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.webGLFramebuffer);
    }

    /**既定のフレームバッファを使う。（キャンバスにレンダリングされるようになる） */
    unbind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
    static bindDefaultFrameBuffer(gl: WebGL2RenderingContext) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
}
export { FrameBuffer };
