import { Vec2 } from "application/core/units";
import { OffscreenRenderer } from "../offscreeen";
import { Renderer, RenderOptions } from "./Renderer";

class CachebleRenderer extends Renderer {
    private offScreenRenderers: OffscreenRenderer[] = [];
    private count: number = 0;
    constructor(cacheSize: Vec2) {
        super();
        this.offScreenRenderers[0] = new OffscreenRenderer(this.gl2, cacheSize);
        this.offScreenRenderers[1] = new OffscreenRenderer(this.gl2, cacheSize);
    }
    public getCacheTex() {
        return this.offScreenRenderers[(this.count - 1) % 2].resultTexture;
    }
    public renderToCache(renderOp: RenderOptions) {
        this.offScreenRenderers[this.count % 2].activate();
        this.render(renderOp);
        this.offScreenRenderers[this.count % 2].deactivate();
        this.count++;
    }
}
export { CachebleRenderer }