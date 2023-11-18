import { BufferUsage, GLBuffer, ITypedArray } from './GLBuffer';

export abstract class AbstractBuffer<
    T extends GLBuffer = GLBuffer,
    U extends ITypedArray = ITypedArray,
> {
    public usage: BufferUsage;
    public data: U;

    public glBuffer: T | null;
    public gl: WebGL2RenderingContext | null;

    private updateID: number;

    constructor(data: U, usage: BufferUsage = WebGL2RenderingContext.STATIC_DRAW) {
        this.data = data;
        this.usage = usage;
        this.glBuffer = null;

        this.gl = null;

        this.updateID = 0;
        this.updateID++;
    }

    /**
     * GLBufferの新規作成を行う
     * @param gl2
     */
    protected abstract generateGLBuffer(gl2: WebGL2RenderingContext): T;

    /**
     * バッファのデータをセットする
     * @param data データ
     * @returns 自身
     */
    public setData(data?: U): this {
        this.data = data ?? this.data;
        this.updateID++;
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
        const glbuffer = this.linkGL(gl);
        glbuffer.bind();
        return this;
    }

    /**
     * バッファの変更内容を更新する
     * @param gl
     * @returns
     */
    public update(gl: WebGL2RenderingContext): this {
        const glbuffer = this.linkGL(gl);

        if (glbuffer.updateID === this.updateID) {
            return this;
        }

        glbuffer.updateID = this.updateID;
        glbuffer.updateData(this.data);
        return this;
    }

    /**
     * WebGL2コンテクストと紐付ける
     * 必要に応じてGLBufferの新規作成を行う
     *
     * @param gl WebGL2コンテクスト
     * @returns GLBuffer
     */
    protected linkGL(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glBuffer) {
            return this.glBuffer;
        }

        this.gl = gl;
        return this.generateGLBuffer(this.gl);
    }
}
