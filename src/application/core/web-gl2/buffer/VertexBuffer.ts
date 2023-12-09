import { AbstractBuffer } from './AbstractBuffer';
import { GLBuffer } from './GLBuffer';

/**頂点バッファで使用可能な型付き配列 */
type VertexBuferData = Float32Array | Float64Array;

/**
 * WebGLへの転送を実現する、頂点データのラッパー
 *
 * @example
 *
 * const indexBuffer = new VertexBuffer(
 *   new Float32Array([0, 1, 2, 1, 3, 2]),
 *   WebGL2RenderingContext.STATIC_DRAW
 * );
 *
 */
export class VertexBuffer extends AbstractBuffer<GLBuffer, VertexBuferData> {
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

        return (this.glBuffer = new GLBuffer(gl, gl.ARRAY_BUFFER));
    }
}
