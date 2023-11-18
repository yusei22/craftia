import { AbstractBuffer } from './AbstractBuffer';
import { GLBuffer } from './GLBuffer';

/**gzVboに渡せる`ArrayBuffer` */
type VertexBuferData = Float32Array | Float64Array;

export class VertexBuffer extends AbstractBuffer<GLBuffer, VertexBuferData> {
    protected generateGLBuffer(gl: WebGL2RenderingContext) {
        return (this.glBuffer = new GLBuffer(gl, gl.ARRAY_BUFFER));
    }
}
