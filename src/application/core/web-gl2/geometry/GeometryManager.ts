import { Renderer } from '../Renderer';
import { Shader } from '../shader';
import { Geometry } from './Geometry';
export class GeometryManager {
    public activeGeometry: Geometry | null;
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.activeGeometry = null;
    }

    /**
     * ジオメトリをバインドする
     * @param geometry
     */
    public bind(geometry: Geometry) {
        this.activeGeometry = geometry;
        geometry.bind(this.renderer.gl2);
    }

    /**
     * ジオメトリのバインドを解除する
     */
    public unbind() {
        this.renderer.gl2.bindVertexArray(null);
    }

    /**
     * ジオメトリのインデックスを使用して描画する
     * @param mode 描画モード
     * @param size 描画する頂点の数
     * @param start 描画開始位置
     * @returns
     */
    public drawIndex(mode: GLenum, size?: number, start?: number) {
        const geometry = this.activeGeometry;
        const gl2 = this.renderer.gl2;

        if (!geometry) {
            console.warn('No geometry is bound. Please bind the geometry first.');
            return;
        }
        if (!geometry.indexBuffer) {
            console.warn('Geometry index is not defined.First define the index of the geometry.');
            return;
        }

        const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT;

        const type =
            byteSize === 1
                ? gl2.UNSIGNED_BYTE
                : byteSize === 2
                ? gl2.UNSIGNED_SHORT
                : gl2.UNSIGNED_INT;

        gl2.drawElements(
            mode,
            size || geometry.indexBuffer.data.length,
            type,
            (start || 0) * byteSize
        );
    }

    public update(geometry: Geometry, shader?: Shader) {
        const _shader = shader ?? this.renderer.shader.shader;

        if (!_shader) {
            console.warn('Shader not bound. Please pass any shader as an argument.');
            return;
        }
        geometry.update(this.renderer, _shader);
    }
}
