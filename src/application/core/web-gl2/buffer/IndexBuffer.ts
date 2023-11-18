import { AbstractBuffer } from './AbstractBuffer';
import { GLBuffer } from './GLBuffer';

/**gzIboに渡せる`ArrayBuffer` */
type IndexBufferData = Int8Array | Int16Array | Int32Array;

export class IndexBuffer extends AbstractBuffer<GLBuffer, IndexBufferData> {
    protected generateGLBuffer(gl2: WebGL2RenderingContext) {
        return (this.glBuffer = new GLBuffer(gl2, gl2.ELEMENT_ARRAY_BUFFER));
    }
}
