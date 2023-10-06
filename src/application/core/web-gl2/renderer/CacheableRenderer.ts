import { OffscreenRenderer } from '../offscreeen';
import { Texture2D } from '../textures';
import { RendererShader, Renderer, RenderOptions } from './Renderer';
import { Vec2 } from 'application/core/units';

class CacheableRenderer extends Renderer {
    private offScreens: OffscreenRenderer[] = [];
    private resultTex: Texture2D;
    private count: number = 0;

    constructor(shader: RendererShader, cacheSize: Vec2) {
        super(shader);
        this.offScreens[0] = this.createOffscreen(cacheSize);
        this.offScreens[1] = this.createOffscreen(cacheSize);

        this.resultTex = this.offScreens[0].resultTexture;
    }
    public renderToCache(renderOp: RenderOptions = {}) {
        super.setOffscreen(this.offScreens[this.count % 2]);

        super.render({
            mode: renderOp.mode,
            type: renderOp.type,
            offset: renderOp.offset,
        });
        super.setOffscreen(null);

        this.resultTex = this.offScreens[this.count % 2].resultTexture;
        this.count++;

        return this;
    }
    public getCacheTex() {
        return this.resultTex;
    }
    public setNewCache(cacheSize: Vec2) {
        this.offScreens[0] = new OffscreenRenderer(this.gl2, cacheSize);
        this.offScreens[1] = new OffscreenRenderer(this.gl2, cacheSize);
        return this;
    }
}
export { CacheableRenderer };
