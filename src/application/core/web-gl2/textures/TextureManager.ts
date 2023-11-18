import { Renderer } from '../Renderer';
import { Texture } from './Texture';

export class TextureManager {
    private readonly renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }
    public bind(texture: Texture, unitNumber?: number) {
        texture.bind(this.renderer.gl2, unitNumber);
    }
    public unbind(unitNumber: number) {
        this.renderer.gl2.activeTexture(this.renderer.gl2.TEXTURE0 + unitNumber);
        this.renderer.gl2.bindTexture(this.renderer.gl2.TEXTURE_2D, null);
    }
    public update(texture: Texture) {
        texture.update(this.renderer.gl2);
    }
}
