/**
 * WegGLのvaoを管理するクラス。
 * WebGLVertexArrayObjectを作成、保持。
 */
export class VertexArray {
    protected gl2: WebGL2RenderingContext;
    private webGLVAO: WebGLVertexArrayObject;

    public updateID: number = 0;
    public shaderID: number | null;

    /**
     * @param gl2 WebGL2のコンストラクター
     */
    constructor(gl2: WebGL2RenderingContext) {
        this.gl2 = gl2;
        this.webGLVAO = this.gl2.createVertexArray() as WebGLVertexArrayObject;

        this.updateID = 0;
        this.shaderID = null;
    }

    /**
     * vaoをバインドする
     */
    public bind() {
        this.gl2.bindVertexArray(this.webGLVAO);
    }

    /**
     * vaoとして`null`をバインドする
     */
    public unbind() {
        this.gl2.bindVertexArray(null);
    }

    /**
     * vaoを破棄する
     */
    public destroy() {
        this.gl2.deleteVertexArray(this.webGLVAO);
    }
}
