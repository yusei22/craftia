export type BufferParam = {
    usage?: BufferUsage;
};

export interface IArrayBuffer extends ArrayBuffer {}

export interface ITypedArray extends IArrayBuffer {
    readonly length: number;
    [index: number]: number;
    readonly BYTES_PER_ELEMENT: number;
}

export type BufferType = WebGL2RenderingContext[
    | 'ARRAY_BUFFER'
    | 'ELEMENT_ARRAY_BUFFER'
    | 'COPY_READ_BUFFER'
    | 'COPY_WRITE_BUFFER'
    | 'TRANSFORM_FEEDBACK_BUFFER'
    | 'UNIFORM_BUFFER'
    | 'PIXEL_PACK_BUFFER'
    | 'PIXEL_UNPACK_BUFFER'];

export type BufferUsage = WebGL2RenderingContext[
    | 'STATIC_DRAW'
    | 'DYNAMIC_DRAW'
    | 'STREAM_DRAW'
    | 'STATIC_READ'
    | 'DYNAMIC_READ'
    | 'STREAM_READ'
    | 'STATIC_COPY'
    | 'DYNAMIC_COPY'
    | 'STREAM_COPY'];

/**
 * WebGLBuffer のラッパー
 * 
 * バインド、データの転送など行う
 */
export class GLBuffer {
    public updateID: number;
    public byteLength: number;

    private gl: WebGL2RenderingContext;
    private webGLBuffer: WebGLBuffer;

    readonly usage: BufferUsage;
    readonly type: BufferType;
    /**
     * GLBufferを作成
     * @param gl WebGL2のコンストラクター
     * @param type 結合する場所 (ターゲット) を指定する GLenum
     * @param bufferData データストアへ格納する型付き配列
     * @param param4
     * @param param4.usage データストアの用途を指定する GLenum
     */
    constructor(
        gl: WebGL2RenderingContext,
        type: BufferType,
        { usage = gl.STATIC_DRAW }: BufferParam = {}
    ) {
        this.gl = gl;

        this.type = type;
        this.usage = usage;

        this.webGLBuffer = gl.createBuffer() as WebGLBuffer;
        this.updateID = 0;
        this.byteLength = 0;
    }

    /**
     * データをセットする
     * 必要に応じてサブセット更新のみを行う
     * @param bufferData セットするデータ
     */
    public updateData(bufferData: ITypedArray | null) {
        if (!bufferData) {
            this.setData(null);
        } else if (this.byteLength >= bufferData.byteLength) {
            this.setSubData(0, bufferData);
        } else {
            this.setData(bufferData);
        }
    }

    /**
     * データをセットする
     * @param bufferData セットするデータ
     */
    public setData(bufferData: ITypedArray | null) {
        this.bind();
        this.gl.bufferData(this.type, bufferData, this.usage);

        this.byteLength = bufferData ? bufferData.byteLength : 0;
        return this;
    }

    /**
     * データストアのサブセットを更新
     * @param offset データ置換を開始するオフセット
     * @param bufferSubData  サブセットデータ
     */
    public setSubData(offset: number, bufferSubData: ITypedArray) {
        this.bind();
        this.gl.bufferSubData(this.type, offset, bufferSubData);

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

    /**
     * バッファを破棄する
     */
    public destroy() {
        this.gl.deleteBuffer(this.webGLBuffer);
        this.byteLength = 0;
    }
}
