type BufferParam = {
    usage?: GLenum;
};
/**
 * WegGLのバッファを管理するクラス。
 * 情報を格納したWebGLBufferを作成、保持。
 */
class Buffer {
    private gl: WebGL2RenderingContext;
    private webGLBuffer: WebGLBuffer;
    readonly usage: GLenum;
    readonly type: GLenum;
    /**
     * @param gl WebGL2のコンストラクター
     * @param type 結合する場所 (ターゲット) を指定する GLenum
     * @param bufferData データストアへ格納する型付き配列
     * @param param4
     * @param param4.usage データストアの用途を指定する GLenum
     */
    constructor(gl: WebGL2RenderingContext, type: GLenum, { usage = gl.STATIC_DRAW }: BufferParam = {}) {
        this.gl = gl;
        this.type = type;
        this.webGLBuffer = gl.createBuffer() as WebGLBuffer;
        this.usage = usage;
    }
    /**
     * データをセットする
     * @param bufferData セットするデータ
     */
    public setData(bufferData: BufferSource) {
        this.bind();
        this.gl.bufferData(this.type, bufferData, this.usage);
        this.unbind();
        return this;
    }
    /**
     * バッファをバインドする
     */
    public bind() {
        this.gl.bindBuffer(this.type, this.webGLBuffer);
    }
    /**
     * WebGLコンテキストに`null`をバインドする。
     */
    public unbind() {
        this.gl.bindBuffer(this.type, null);
    }
}
export type { BufferParam };
export { Buffer };
