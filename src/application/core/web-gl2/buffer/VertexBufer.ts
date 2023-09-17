import { Buffer, BufferParam } from './Buffer';

/**gzVboに渡せる`ArrayBuffer` */
type VertexBuferData = Float32Array | Float64Array;
/**
 * WegGLの頂点バッファを管理するクラス。
 * 頂点情報を格納したWebGLBufferを保持。
 */
class VertexBufer extends Buffer {
    private _length: number;
    /**
     * インデックスデータの要素素を得る
     */
    public get length() {
        return this._length;
    }

    /**
     * @param gl WebGL2のコンストラクター
     * @param bufferData データストアへ格納する型付き配列
     * @param param3
     * @param param3.usage データストアの用途を指定する GLenum
     */
    constructor(gl: WebGL2RenderingContext, param: BufferParam = {}) {
        super(gl, gl.ARRAY_BUFFER, param);
        this._length = 0;
    }

    /**
     * データをセットする
     * @param bufferData セットするデータ
     */
    public setData(bufferData: VertexBuferData): this {
        super.setData(bufferData);
        this._length = bufferData.length;
        return this;
    }
}
export { VertexBufer };
export type { VertexBuferData };
