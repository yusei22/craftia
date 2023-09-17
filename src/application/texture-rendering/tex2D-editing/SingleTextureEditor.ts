import { TexRenderManager, TexRendererSader } from '../tex2D-rendering';
import { Vec2 } from 'application/core/units';
import { OffscreenRenderer, Texture2D } from 'application/core/web-gl2';

class SingleOffscreenTexEditor {
    /**テクスチャ処理前に呼ばれる関数 */
    public listener?: Function;
    /**WebGL2コンテクスト */
    private gl: WebGL2RenderingContext;
    /**オフスクリーンレンダラ */
    private offScreenRenderer: OffscreenRenderer;
    /**処理するテクスチャ */
    private texture: Texture2D;
    /**テクスチャのレンダラ */
    private TexRenderer: TexRenderManager;

    /**
     * @param gl webglコンテクスト
     * @param texture 処理するテクスチャ
     * @param fragmentShader テクスチャのシェーダー テクスチャの処理内容を書く
     * @param location テクスチャをレンダリングする位置
     */
    constructor(
        gl: WebGL2RenderingContext,
        texture: Texture2D,
        fragmentShader: TexRendererSader,
        location?: Vec2
    ) {
        this.gl = gl;
        this.texture = texture;
        this.offScreenRenderer = new OffscreenRenderer(this.gl, this.texture.size);
        this.TexRenderer = new TexRenderManager(this.gl, this.texture.size, fragmentShader, location);
    }
    /**
     * @param param0
     * @param param0.flipY 画像の上下を反対にする
     * @param param0.createPixcelsData 処理後の画像のピクセルデータを読み取って返すか
     * @returns 読み取った処理後の画像のピクセルデータ
     */
    execute({ flipY = false }: { flipY?: boolean } = {}) {
        this.TexRenderer.listener = this.listener;

        this.TexRenderer.render(this.texture, {
            offscreen: this.offScreenRenderer,
            flipY: flipY,
        });
    }
}

class SingleOnscreenTexEditor {
    /**テクスチャ処理前に呼ばれる関数 */
    public listener?: Function;
    /**WebGL2コンテクスト */
    private gl: WebGL2RenderingContext;
    /**処理するテクスチャ */
    private texture: Texture2D;
    /**テクスチャのレンダラ */
    private TexRenderer: TexRenderManager;
    /**
     * @param gl webglコンテクスト
     * @param texture 処理するテクスチャ
     * @param fragmentShader テクスチャのシェーダー テクスチャの処理内容を書く
     * @param location テクスチャをレンダリングする位置
     */
    constructor(
        gl: WebGL2RenderingContext,
        texture: Texture2D,
        fragmentShader: TexRendererSader,
        location?: Vec2
    ) {
        this.gl = gl;
        this.texture = texture;
        this.TexRenderer = new TexRenderManager(this.gl, this.texture.size, fragmentShader, location);
    }

    /**
     * @param param0
     * @param param0.flipY 画像の上下を反対にする
     * @param param0.flipY 処理後の画像のピクセルデータを読み取って返すか
     * @returns 読み取った処理後の画像のピクセルデータ
     */
    execute({ flipY = false }: { flipY?: boolean } = {}) {
        this.TexRenderer.listener = this.listener;
        this.TexRenderer.render(this.texture, {
            offscreen: null,
            flipY: flipY,
        });
    }
}
export { SingleOffscreenTexEditor, SingleOnscreenTexEditor };
