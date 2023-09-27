import { Program } from '../program';
import { VertexDataProvider } from './VertexDataProvider';
import { Vec2 } from 'application/core/units';

const VERTEX_SIZE = 2;
const TEXTURE_SIZE = 2;
const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT;
const VERTEX_OFFSET = 0;
const TEXTURE_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

function createIndexArray() {
    return new Int16Array([0, 1, 2, 1, 3, 2]);
}

function createVertexArray(location: Vec2, texSize: Vec2, resolution: Vec2) {
    const coordNormalizeX = (n: number) => {
        return (n / resolution.x) * 2.0 - 1.0;
    };

    const coordNormalizeY = (n: number) => {
        return (n / resolution.y) * 2.0 - 1.0;
    };

    const x1 = coordNormalizeX(location.x);
    const x2 = coordNormalizeX(location.x + texSize.x);
    const y1 = coordNormalizeY(location.y);
    const y2 = coordNormalizeY(location.y + texSize.y);

    return new Float32Array([
        x1,
        y1,
        0.0,
        0.0,
        x1,
        y2,
        0.0,
        1.0,
        x2,
        y1,
        1.0,
        0.0,
        x2,
        y2,
        1.0,
        1.0,
    ]);
}
/**
 * - `a_position` `Vec2` 頂点座標
 * - `a_texCoord` `Vec2` テクスチャ座標
 */
class Tex2DVertex extends VertexDataProvider {
    constructor(gl2: WebGL2RenderingContext, texLoc: Vec2, texSize: Vec2, resolution: Vec2) {
        super(gl2, createIndexArray(), createVertexArray(texLoc, texSize, resolution));
    }

    public setAttrsFrom(program: Program) {
        const a_position = program.getAttribute('a_position', VERTEX_SIZE, STRIDE, VERTEX_OFFSET);
        const a_texCoord = program.getAttribute('a_texCoord', TEXTURE_SIZE, STRIDE, TEXTURE_OFFSET);
        super.addAttributes(a_position, a_texCoord);
        return this;
    }
}

export { Tex2DVertex as Tex2DVertex };
