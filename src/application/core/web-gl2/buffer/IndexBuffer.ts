import { AbstractBuffer } from './AbstractBuffer';
import { GLBuffer } from './GLBuffer';

/**gzIboに渡せる`ArrayBuffer` */
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
    protected generateGLBuffer(gl2: WebGL2RenderingContext) {
        return (this.glBuffer = new GLBuffer(gl2, gl2.ELEMENT_ARRAY_BUFFER));
    }
}
