/**
 * WegGLのvaoを管理するクラス。
 * WebGLVertexArrayObjectを作成、保持。
 */
class VertexArray {
    private gl: WebGL2RenderingContext;
    private webGLVAO: WebGLVertexArrayObject;
    /**
     * @param gl WebGL2のコンストラクター
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.webGLVAO = this.gl.createVertexArray() as WebGLVertexArrayObject;
    }
    /**
     * vaoをバインドする
     */
    bind() {
        this.gl.bindVertexArray(this.webGLVAO);
    }
    /**
     * vaoとして`null`をバインドする
     */
    unbind() {
        this.gl.bindVertexArray(null);
    }
}
export { VertexArray };
