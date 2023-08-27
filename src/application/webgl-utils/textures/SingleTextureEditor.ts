import { Vec2 } from '../../units';
import { OffScreenRenderer } from '../OffScreenRenderer';
import { Texture2D } from '../webgl/Texture2D';
import { TextureEditor } from './TextureEditor';
import { TexRendererSader } from './TextureRenderer';
class SingleOffscreenTexEditor extends TextureEditor {
  public listener?: Function;
  private offScreenRenderer: OffScreenRenderer;
  private texture: Texture2D;
  constructor(gl: WebGL2RenderingContext, texture: Texture2D, fragmentShader: TexRendererSader, location?: Vec2) {
    super(gl, texture.size, fragmentShader, location);
    this.texture = texture;
    this.offScreenRenderer = new OffScreenRenderer(this.gl, this.texture.size);
  }
  execute({ flipY = false, readPixcels = false }: { flipY?: boolean; readPixcels?: boolean } = {}) {
    this.offScreenRenderer.activate();
    this.listener?.();

    const pixcelData: Uint8Array | undefined = this.processTexture(this.texture, {
      flipY: flipY,
      createPixcelsData: readPixcels,
    });

    this.offScreenRenderer.deactivate();

    return pixcelData;
  }
}
class SingleOnscreenTexEditor extends TextureEditor {
  public listener?: Function;
  private texture: Texture2D;

  constructor(gl: WebGL2RenderingContext, texture: Texture2D, fragmentShader: TexRendererSader, location?: Vec2) {
    super(gl, texture.size, fragmentShader, location);
    this.texture = texture;
  }
  execute({ flipY = false, readPixcels = false }: { flipY?: boolean; readPixcels?: boolean } = {}) {
    OffScreenRenderer.toOnscreen(this.gl);
    this.listener?.();

    const pixcelData: Uint8Array | undefined = this.processTexture(this.texture, {
      flipY: flipY,
      createPixcelsData: readPixcels,
    });
    return pixcelData;
  }
}
export { SingleOffscreenTexEditor, SingleOnscreenTexEditor };
