import { Vec2 } from '../../units';
import { VertexDataProvider } from '../VertexDataProvider';
import { Attribute } from '../webgl/Attribute';
import { Program } from '../webgl/Program';
import { VertexShader, FragmentShader } from '../webgl/Shader';
import { Texture2D } from '../webgl/Texture2D';
import { UniformValue } from '../webgl/uniforms/Uniform';
import { UniformFloat } from '../webgl/uniforms/UniformFloat';
import { UniformInt } from '../webgl/uniforms/UniformInt';

const VERTEX_SIZE = 2;
const TEXTURE_SIZE = 2;
const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT;
const VERTEX_OFFSET = 0;
const TEXTURE_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

type TexRendererVarNames = {
  textureUniform: string;
  textureCoordVarying: string;
};
class TexRendererSader extends FragmentShader {
  readonly varNames: TexRendererVarNames;
  constructor(gl: WebGL2RenderingContext, source: string, essentialVarNames: TexRendererVarNames) {
    super(gl, source);
    this.varNames = essentialVarNames;
  }
}
class TextureRenderer {
  private gl: WebGL2RenderingContext;
  private program: Program;
  private vertexProvider: VertexDataProvider;
  private u_resolution: UniformFloat<Vec2>;
  private u_flipY: UniformFloat<number>;
  private u_texture: UniformInt<number>;
  public listener?: Function;

  constructor(gl: WebGL2RenderingContext, rendererSize: Vec2, fragmentShader: TexRendererSader, location?: Vec2) {
    this.gl = gl;

    const vertexShader = createVertexShader(this.gl, {
      v_textureCoordName: fragmentShader.varNames.textureCoordVarying,
    });

    this.program = new Program(this.gl, vertexShader, fragmentShader);
    this.vertexProvider = createVertexProvider(this.program, rendererSize.clone(), location ?? new Vec2(0, 0));
    this.u_texture = new UniformInt<number>(this.program, fragmentShader.varNames.textureUniform);
    this.u_resolution = new UniformFloat<Vec2>(this.program, 'u_resolution');
    this.u_flipY = new UniformFloat<number>(this.program, 'u_flipY');
  }
  activate() {
    this.program.use();
    this.vertexProvider.activate();
  }
  draw(texture: Texture2D, { flipY = false }: { flipY?: boolean } = {}) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    texture.bind();
    this.u_texture.set(texture.unitNumber);
    this.u_resolution.set(new Vec2(this.gl.canvas.width, this.gl.canvas.height));

    if (flipY) {
      this.u_flipY.set(-1.0);
    } else {
      this.u_flipY.set(1.0);
    }

    this.listener?.();
    this.gl.drawElements(this.gl.TRIANGLES, this.vertexProvider.count, this.gl.UNSIGNED_SHORT, 0);
  }
  deactivate() {
    this.vertexProvider.deactivate();
  }
  getUniformFloat<T extends UniformValue>(name: string) {
    return new UniformFloat<T>(this.program, name);
  }
  getUniformInt<T extends UniformValue>(name: string) {
    return new UniformInt<T>(this.program, name);
  }
}
function createVertexShader(gl: WebGL2RenderingContext, { v_textureCoordName }: { v_textureCoordName: string }) {
  const vertexShaderSource = /*glsl */ `#version 300 es

    in vec2 a_position;
    in vec2 a_textureCoord;
    uniform vec2 u_resolution;
    uniform float u_flipY;
    out vec2 ${v_textureCoordName};

    vec2 coordNormalize(vec2 pixcelCoord) {
        vec2 normalizedCoord=(pixcelCoord / u_resolution * 2.0) - 1.0;
        return normalizedCoord*vec2(1.0, u_flipY);
    }

    void main() {
        ${v_textureCoordName} = a_textureCoord;
        vec2 normalizedCoord =coordNormalize(a_position);
        gl_Position = vec4(normalizedCoord, 0, 1);
    }`;
  return new VertexShader(gl, vertexShaderSource);
}
function createIndexArray() {
  return new Int16Array([0, 1, 2, 1, 3, 2]);
}
function createVertexArray(texSize: Vec2, location: Vec2) {
  const x1 = location.x;
  const x2 = location.x + texSize.x;
  const y1 = location.y;
  const y2 = location.y + texSize.y;

  return new Float32Array([x1, y1, 0.0, 0.0, x1, y2, 0.0, 1.0, x2, y1, 1.0, 0.0, x2, y2, 1.0, 1.0]);
}
function createVertexProvider(program: Program, texSize: Vec2, texLocation: Vec2) {
  const gl = program.gl;
  const indexData = createIndexArray();
  const vertexData = createVertexArray(texSize, texLocation);
  const vertexProvider = new VertexDataProvider(gl, indexData, vertexData);
  const a_position = new Attribute(program, 'a_position', VERTEX_SIZE, STRIDE, VERTEX_OFFSET);
  const a_textureCoord = new Attribute(program, 'a_textureCoord', TEXTURE_SIZE, STRIDE, TEXTURE_OFFSET);
  vertexProvider.addAttribute(a_position);
  vertexProvider.addAttribute(a_textureCoord);
  vertexProvider.transfer();
  return vertexProvider;
}
export { TexRendererSader, TextureRenderer };
