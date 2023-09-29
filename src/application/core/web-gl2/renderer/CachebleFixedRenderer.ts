import { OffscreenRenderer } from '../offscreeen';
import { Texture2D } from '../textures';
import { FixedRenderer, RenderOptions, RendererBufferData, RendererShader } from './FixedRenderer';
import { Vec2 } from 'application/core/units';

type CacheRenderOptions = Omit<RenderOptions, 'offscreen'>;

class CachebleFixedRenderer extends FixedRenderer {
    /**オフスクリーンレンダラ */
    private offScreenRenderers: OffscreenRenderer[] = [];
    /**オフスクリーンレンダラへの描画回数 */
    private count: number = 0;
    /**キャッシュ内容のテクスチャ */
    private _resultTex: Texture2D;

    /**
     * @param bufferData バッファのデータ
     * @param shader シェーダー
     * @param cacheSize キャッシュサイズ
     */
    constructor(
        bufferData: RendererBufferData,
        shader: RendererShader,
        cacheSize: Vec2
    ) {
        super(bufferData, shader);
        this.offScreenRenderers[0] = this.createOffscreenRenderer(cacheSize);
        this.offScreenRenderers[1] = this.createOffscreenRenderer(cacheSize);

        this._resultTex = this.offScreenRenderers[0].resultTexture;
    }
    public renderToCache(renderOp: CacheRenderOptions = {}) {
        super.render({
            offscreen: this.offScreenRenderers[this.count % 2],
            mode: renderOp.mode,
            type: renderOp.type,
            offset: renderOp.offset,
        });

        this._resultTex = this.offScreenRenderers[this.count % 2].resultTexture;
        this.count++;
        return this;
    }
    /**
     * キャッシュ先のテクスチャ得る
     * @returns 
     */
    public getCacheTex() {
        return this._resultTex;
    }
    /**
     * 新しいキャッシュをセット
     * @param cacheSize キャッシュサイズ
     * @returns 
     */
    public setNewCache(cacheSize: Vec2) {
        this.offScreenRenderers[0] = new OffscreenRenderer(this.gl2, cacheSize);
        this.offScreenRenderers[1] = new OffscreenRenderer(this.gl2, cacheSize);
        return this;
    }
}
export { CachebleFixedRenderer };
