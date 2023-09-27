import { Program } from '../program';
import { VertexDataProvider } from './VertexDataProvider';
import { Vec2 } from 'application/core/units';

const VERTEX_SIZE = 2;
const VERTEX_OFFSET = 0;
const STRIDE = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

function createIndexArray() {
    return new Int16Array([0, 1, 2, 1, 3, 2]);
}

function createVertexArray(location: Vec2, size: Vec2, resolution: Vec2) {
    const coordNormalizeX = (n: number) => {
        return (n / resolution.x) * 2.0 - 1.0;
    };

    const coordNormalizeY = (n: number) => {
        return (n / resolution.y) * 2.0 - 1.0;
    };

    const x1 = coordNormalizeX(location.x);
    const x2 = coordNormalizeX(location.x + size.x);
    const y1 = coordNormalizeY(location.y);
    const y2 = coordNormalizeY(location.y + size.y);

    return new Float32Array([x1, y1, x1, y2, x2, y1, x2, y2]);
}
/**
 * - `a_position` `Vec2` 頂点座標
 */
class Rect2DVertex extends VertexDataProvider {
    constructor(gl2: WebGL2RenderingContext, rectLoc: Vec2, rectSize: Vec2, resolution: Vec2) {
        super(gl2, createIndexArray(), createVertexArray(rectLoc, rectSize, resolution));
    }

    public setAttrsFrom(program: Program) {
        const a_position = program.getAttribute('a_position', VERTEX_SIZE, STRIDE, VERTEX_OFFSET);
        super.addAttributes(a_position);
        return this;
    }
}
export { Rect2DVertex };
