import { Vec2 } from "application/core/units";
import { Renderer } from "./Renderer";
import { IUniformValue } from "../uniforms";
import { TexPixcels } from "../textures";

const VERTEX_SIZE = 2;
const TEXTURE_SIZE = 2;
const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT;
const VERTEX_OFFSET = 0;
const TEXTURE_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

function createIndexData() {
    return new Int16Array([0, 1, 2, 1, 3, 2]);
}

function createVertexData(location: Vec2, texSize: Vec2, resolution: Vec2) {
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
        x1, y1, 0.0, 0.0,
        x1, y2, 0.0, 1.0,
        x2, y1, 1.0, 0.0,
        x2, y2, 1.0, 1.0,
    ]);
}
function createTex2DVertexShaderSource(
    { v_texCoordName }: { v_texCoordName: string }
) {
    const vertexShaderSource = /*glsl */ `#version 300 es

      in vec2 a_position;
      in vec2 a_texCoord;

      uniform float u_flipY;
      out vec2 ${v_texCoordName};

      void main() {
          ${v_texCoordName} =  a_texCoord;
          gl_Position = vec4( a_position * vec2(1.0, u_flipY), 0, 1);
      }`;

    return vertexShaderSource;
}

class Image2DRenderer {
    private renderer: Renderer;
    constructor() {
        this.renderer = new Renderer();
        this.renderer.setIndexBufferData(createIndexData());
    }
    public getCanvas() {
        return this.renderer.getCanvas()
    }
    public setImageVertex(texsize: Vec2, texLoc: Vec2) {
        this.renderer.setVertexBufferData(
            createVertexData(
                texsize,
                texLoc,
                this.renderer.getResolution()
            )
        )
    }
    public setUniformIntValue(name: string, value: IUniformValue) {
        this.renderer.setUniformIntValue(name, value);
    }
    public setUniformFloatValue(name: string, value: IUniformValue) {
        this.renderer.setUniformFloatValue(name, value);
    }
    public attachShader(fragmentShaderSource: string, { v_texCoordName }: { v_texCoordName: string }) {
        this.renderer.attachVertexShaderSource(
            createTex2DVertexShaderSource({ v_texCoordName })
        );
        this.renderer.attachFragmentShaderSource(fragmentShaderSource);
        this.renderer.compileShader();
        this.renderer.setAttributes({
            name: 'a_position',
            size: VERTEX_SIZE,
            stride: STRIDE,
            offset: VERTEX_OFFSET,
        }, {
            name: 'a_texCoord',
            size: TEXTURE_SIZE,
            stride: STRIDE,
            offset: TEXTURE_OFFSET,
        })
    }
    public attachImage(image: TexPixcels, size: Vec2, unitNumber: number) {
        const tex = this.renderer.createTex2D();
        tex.attachImage(image, size);
        this.renderer.setTex2D(tex, unitNumber);
    }
    public render(){
        this.renderer.render();
    }
}
export { Image2DRenderer };