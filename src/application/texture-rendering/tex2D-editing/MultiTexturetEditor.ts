import { TexRenderManager, TexRendererSader } from '../tex2D-rendering';
import { Vec2 } from 'application/core/units';
import { OffscreenRenderer, Texture2D } from 'application/core/web-gl2';

class MultiTexturetEditor {
    /**処理回数 */
    public processTimes: number = 1;

    /**オンスクローンでレンダリングするか */
    protected onscreenRendering: boolean = false;

    /**処理ごとに実行する関数 */
    public listeners: Function[] = [];
    /**オフスクリーンレンダラ */
    private offScreenRenderers: OffscreenRenderer[] = [];
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
        this.offScreenRenderers[0] = new OffscreenRenderer(this.gl, this.texture.size);
        this.offScreenRenderers[1] = new OffscreenRenderer(this.gl, this.texture.size);
        this.TexRenderer = new TexRenderManager(this.gl, this.texture.size, fragmentShader, location);
    }
    /**テクスチャを処理(レンダリング)する */
    execute({ flipY = false }: { flipY?: boolean } = {}) {
        let nextTexture: Texture2D = this.texture;
        let count = 0;

        //オフスクリーンレンダラで実行
        for (let i = 0; i < this.processTimes - 1; i++) {
            this.TexRenderer.listener = this.listeners[i];
            this.TexRenderer.render(nextTexture, {
                offscreen: this.offScreenRenderers[i % 2],
                flipY: false,
            });

            nextTexture = this.offScreenRenderers[i % 2].resultTexture;
            count++;
        }

        //最終描画がオンスクリーン/オフスクリーンかで処理を分ける
        this.TexRenderer.render(nextTexture, {
            offscreen: this.onscreenRendering ? null : this.offScreenRenderers[count % 2],
            flipY: flipY,
        });
    }
}
class MultiOffScreenTexEditor extends MultiTexturetEditor {
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
        super(gl, texture, fragmentShader, location);
        this.onscreenRendering = false;
    }
}
class MultiOnScreenTexEditor extends MultiTexturetEditor {
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
        super(gl, texture, fragmentShader, location);
        this.onscreenRendering = true;
    }
}
export { MultiOffScreenTexEditor, MultiOnScreenTexEditor };
