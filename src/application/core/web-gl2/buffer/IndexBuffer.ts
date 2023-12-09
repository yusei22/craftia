import { AbstractBuffer } from './AbstractBuffer';
import { GLBuffer } from './GLBuffer';

/**インデックスバッファで使用可能な型付き配列 */
type IndexBufferData = Int8Array | Int16Array | Int32Array;

/**
 * WebGLへの転送を実現する、インデックスデータのラッパー
 *
 * @example
 *
 * const indexBuffer = new IndexBuffer(
 *   new Int32Array([0, 1, 2, 1, 3, 2]),
 *   WebGL2RenderingContext.STATIC_DRAW
 * );
 *
 */
export class IndexBuffer extends AbstractBuffer<GLBuffer, IndexBufferData> {
    /**
     * GLBufferを返す
     * 必要があればGLBuffeを新規作成する
     *
     * @param gl WebGL2Context
     * @returns GLBuffer
     */
    protected generateGLBuffer(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glBuffer) {
            return this.glBuffer;
        }

        this.gl = gl;

        return (this.glBuffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER));
    }
}
