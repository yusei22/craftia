import { VertexAttribute } from '../vertex-attribute';
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

    return new Float32Array([x1, y1, 0.0, 0.0, x1, y2, 0.0, 1.0, x2, y1, 1.0, 0.0, x2, y2, 1.0, 1.0]);
}
class Tex2DVertexDataProvider extends VertexDataProvider {
    private a_positionLoc: GLenum = -1;
    private a_texCoordLoc: GLenum = -1;
    constructor(gl2: WebGL2RenderingContext, texLoc: Vec2, texSize: Vec2, resolution: Vec2) {
        super(gl2, createIndexArray(), createVertexArray(texLoc, texSize, resolution));
    }
    public setA_positionLoc(a_positionLoc: GLenum): this {
        this.a_positionLoc = a_positionLoc;
        return this;
    }
    public setA_texCoordLoc(a_texCoordLoc: GLenum): this {
        this.a_texCoordLoc = a_texCoordLoc;
        return this;
    }
    public transfer(): this {
        const a_position = new VertexAttribute(this.a_positionLoc, VERTEX_SIZE, STRIDE, VERTEX_OFFSET);
        const a_textureCoord = new VertexAttribute(this.a_texCoordLoc, TEXTURE_SIZE, STRIDE, TEXTURE_OFFSET);
        super.addAttribute(a_position).addAttribute(a_textureCoord).transfer();
        return this;
    }
}

export { Tex2DVertexDataProvider };
