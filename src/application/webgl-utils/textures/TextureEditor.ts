import { Vec2 } from '../../units';
import { Texture2D } from '../webgl/Texture2D';
import { UniformValue } from '../webgl/uniforms/Uniform';
import { TextureRenderer, TexRendererSader } from './TextureRenderer';
class TextureEditor {
  protected gl: WebGL2RenderingContext;
  private textureRenderer: TextureRenderer;
  constructor(gl: WebGL2RenderingContext, size: Vec2, fragmentShader: TexRendererSader, location?: Vec2) {
    this.gl = gl;
    this.textureRenderer = new TextureRenderer(this.gl, size, fragmentShader, location);
  }
  activate() {
    this.textureRenderer.activate();
  }
  protected processTexture(
    texture: Texture2D,
    { flipY, createPixcelsData }: { flipY: boolean; createPixcelsData: boolean }
  ) {
    let pixcelbuffer: Uint8Array | undefined;
    this.textureRenderer.draw(texture, { flipY: flipY });
    if (createPixcelsData) {
      pixcelbuffer = readPixels(texture);
    }
    return pixcelbuffer;
  }
  deactivate() {
    this.textureRenderer.deactivate();
  }
  getUniformFloat<T extends UniformValue>(name: string) {
    return this.textureRenderer.getUniformFloat<T>(name);
  }
  getUniformInt<T extends UniformValue>(name: string) {
    return this.textureRenderer.getUniformInt<T>(name);
  }
}
function readPixels(texture: Texture2D) {
  const gl = texture.gl;
  const pixcelbuffer = new Uint8Array(texture.size.x * texture.size.y * 4);
  gl.readPixels(0, 0, texture.size.x, texture.size.y, gl.RGBA, gl.UNSIGNED_BYTE, pixcelbuffer);
  return pixcelbuffer;
}
export { TextureEditor };
