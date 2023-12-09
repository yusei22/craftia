import { BufferUsage, GLBuffer, ITypedArray } from './GLBuffer';

/**
 * WebGLへの転送を実現する型付き配列のラッパー
 */
export abstract class AbstractBuffer<
    T extends GLBuffer = GLBuffer,
    U extends ITypedArray = ITypedArray,
> {
    public usage: BufferUsage;
    public data: U;

    public glBuffer: T | null;
    public gl: WebGL2RenderingContext | null;

    private updateID: number;

    /**
     * バッファを作成する
     * @param data セットしたいデータ
     * @param usage データストへの用途
     */
    constructor(data: U, usage: BufferUsage = WebGL2RenderingContext.STATIC_DRAW) {
        this.data = data;
        this.usage = usage;
        this.glBuffer = null;

        this.gl = null;

        this.updateID = 0;
        this.updateID++;
    }

    /**
     * GLBufferを返す
     * 必要があればGLBuffeを新規作成する
     * @param gl WebGL2コンテクスト
     */
    protected abstract generateGLBuffer(gl: WebGL2RenderingContext): T;
    
    /**
     * このバッファにデータをセットし、
     * GPU へのアップロードが必要であるというフラグを立てる。
     * 
     * @param data セットしたいデータ
     * @returns 自身
     */
    public setData(data?: U): this {
        this.data = data ?? this.data;
        this.updateID++;
        return this;
    }

    /**
     * GPUへのデータのアップロードを完了する。
     * ただし、アップロードのフラグが立っていないとき、処理はスキップされる。
     * @param gl
     * @returns
     */
    public update(gl: WebGL2RenderingContext): this {
        const glbuffer = this.generateGLBuffer(gl);

        if (glbuffer.updateID === this.updateID) {
            return this;
        }

        glbuffer.updateID = this.updateID;
        glbuffer.updateData(this.data);
        return this;
    }

    /**
     * バッファを破棄する
     * @returns 自身
     */
    public destroy(): this {
        this.glBuffer?.destroy();
        this.glBuffer = null;
        return this;
    }

    /**
     * バッファをバインドする
     * @param gl
     * @returns
     */
    public bind(gl: WebGL2RenderingContext): this {
        const glbuffer = this.generateGLBuffer(gl);
        glbuffer.bind();
        return this;
    }
}
