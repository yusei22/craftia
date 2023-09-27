import { Vec2 } from 'application/core/units';
import {
    OffscreenRenderer,
    Texture2D,
    IUniformValue,
    UniformFloat,
    UniformInt,
    TexPixcels,
    WebGL2,
} from 'application/core/web-gl2';
import {
    TexRenderShader,
    TextureRenderer,
} from 'application/core/web-gl2/renderer/TextureRenderer';

type TexEditorProps = {
    getUniformFloat: <T extends IUniformValue>(name: string) => UniformFloat<T>;
    getUniformInt: <T extends IUniformValue>(name: string) => UniformInt<T>;
};

class WebGLImageEditor extends WebGL2 {
    /**処理回数 */
    public processTimes: number = 1;
    /**処理ごとに実行する関数 */
    public listeners: ((props: TexEditorProps) => void)[] = [];

    /**オフスクリーンレンダラ */
    private offScreenRenderers: OffscreenRenderer[] = [];
    /**処理するテクスチャ */
    private texture: Texture2D;
    /**テクスチャのレンダラ */
    private renderer: TextureRenderer;

    constructor(image: TexPixcels, imageSize: Vec2, imageLoc: Vec2, shader: TexRenderShader) {
        super();
        this.texture = new Texture2D(this.gl2).attachImage(image, imageSize);

        this.offScreenRenderers[0] = new OffscreenRenderer(this.gl2, this.texture.size);
        this.offScreenRenderers[1] = new OffscreenRenderer(this.gl2, this.texture.size);

        this.renderer = new TextureRenderer(this.gl2, imageSize, imageLoc, shader);
    }
    /**
     * テクスチャを処理(レンダリング)する
     */
    public execute({ flipY = false }: { flipY?: boolean } = {}) {
        this.renderer.useTexRendering(({ getUniformFloat, getUniformInt, render }) => {
            let nextTexture: Texture2D = this.texture;
            let count = 0;

            //オフスクリーンレンダラで実行
            for (let i = 0; i < this.processTimes - 1; i++) {
                this.listeners[i]?.({ getUniformFloat, getUniformInt });

                render(nextTexture, {
                    offscreen: this.offScreenRenderers[i % 2],
                    flipY: false,
                });

                nextTexture = this.offScreenRenderers[i % 2].resultTexture;
                count++;
            }

            //オンスクリーンレンダラで実行
            this.listeners[count]?.({ getUniformFloat, getUniformInt });
            render(nextTexture, {
                offscreen: null,
                flipY: flipY,
            });
        });
    }
    public getResult() {
        return this.getCanvas();
    }
}
export { WebGLImageEditor as TextureEditor };
