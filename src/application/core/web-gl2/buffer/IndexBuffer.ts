import { Buffer, BufferParam } from './Buffer';

/**gzIboに渡せる`ArrayBuffer` */
type IndexBufferData = Int8Array | Int16Array | Int32Array;
/**
 * WegGLのインデックスバッファを管理するクラス。
 * インデックスの情報を格納したWebGLBufferを保持。
 */
class IndexBuffer extends Buffer {
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
        super(gl, gl.ELEMENT_ARRAY_BUFFER, param);
        this._length = 0;
    }

    /**
     * データをセットする
     * @param bufferData セットするデータ
     */
    public setData(bufferData: IndexBufferData): this {
        super.setData(bufferData);
        this._length = bufferData.length;
        return this;
    }
}
export { IndexBuffer };
export type { IndexBufferData };
