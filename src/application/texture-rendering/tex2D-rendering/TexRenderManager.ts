import { TexRendererSader } from './TexRendererSader';
import { createTex2DVertexProvider, createTex2DVertexShader } from './helper';
import { U_texture, U_flipY, U_resolution } from './types';
import { Vec2 } from 'application/core/units';
import {
    Program,
    UniformFloat,
    UniformInt,
    IUniformValue,
    Texture2D,
    OffscreenRenderer,
    VertexDataProvider,
} from 'application/core/web-gl2';

type renderingOption = {
    /**画像の上下を反対にする */
    flipY: boolean;
    /** オフスクリーンレンダラ*/
    offscreen: OffscreenRenderer | null;
};

/**テクスチャ2Dレンダラ */
class TexRenderManager {
    public listener?: Function;

    private gl: WebGL2RenderingContext;
    private program: Program;
    private vertexProvider: VertexDataProvider;

    private u_texture: U_texture;
    private u_resolution: U_resolution;
    private u_flipY: U_flipY;

    constructor(
        gl: WebGL2RenderingContext,
        rendererSize: Vec2,
        fragmentShader: TexRendererSader,
        location?: Vec2
    ) {
        this.gl = gl;
        //頂点シェーダー
        const vertexShader = createTex2DVertexShader(this.gl, {
            v_textureCoordName: fragmentShader.varNames.textureCoordVarying,
        });

        //プログラム
        this.program = new Program(this.gl, vertexShader, fragmentShader);

        //頂点プロバイダ
        this.vertexProvider = createTex2DVertexProvider(
            this.program,
            rendererSize,
            location ?? new Vec2(0, 0)
        );

        //Uniform変数
        this.u_texture = new UniformInt<number>(this.program, fragmentShader.varNames.textureUniform);
        this.u_resolution = new UniformFloat<Vec2, 'u_resolution'>(this.program, 'u_resolution');
        this.u_flipY = new UniformFloat<number, 'u_flipY'>(this.program, 'u_flipY');
    }

    /**ビューポートを設定 */
    public viewport(location: Vec2, size: Vec2) {
        this.gl.viewport(location.x, location.y, size.x, size.y);
    }

    /**アクティブにする */
    public activate() {
        this.program.use();
        this.vertexProvider.activate();
    }

    /**非アクティブにする */
    public deactivate() {
        this.vertexProvider.deactivate();
    }

    /**
     *  レンダリング
     * @param texture レンダリングするテクスチャ
     * @param param0
     */
    public render(texture: Texture2D, { offscreen, flipY }: renderingOption) {
        //オフスクリーンレンダラをセットアップ
        this.setUpOffscreenRenderer(offscreen);

        //uniform変数をセットアップ
        if (flipY) {
            this.u_flipY.set(-1.0);
        } else {
            this.u_flipY.set(1.0);
        }
        this.u_texture.set(texture.unitNumber);
        this.u_resolution.set(new Vec2(this.gl.canvas.width, this.gl.canvas.height));

        //テクスチャバインド
        texture.bind();
        //リスナを実行
        this.listener?.();
        //描画
        this.gl.drawElements(
            this.gl.TRIANGLES,
            this.vertexProvider.bufferElementCount,
            this.gl.UNSIGNED_SHORT,
            0
        );
    }

    /**
     * uniform変数の場所を得る(浮動小数点型)
     * @param name uniform変数の名前
     * @returns uniform変数の場所
     */
    public getUniformFloat<T extends IUniformValue, U extends string = string>(name: U) {
        return new UniformFloat<T, U>(this.program, name);
    }

    /**
     * uniform変数の場所を得る(整数型)
     * @param name uniform変数の名前
     * @returns uniform変数の場所
     */
    public getUniformInt<T extends IUniformValue, U extends string = string>(name: U) {
        return new UniformInt<T, U>(this.program, name);
    }

    /**
     * ピクセルデータを読み取る
     * @param location 読み取り開始位置
     * @param size 読み取りサイズ
     * @param offscreen 読み取るオフスクリーン
     * @returns 読み取ったピクセルデータ
     */
    public readPixcels(location: Vec2, size: Vec2, offscreen: OffscreenRenderer | null) {
        this.setUpOffscreenRenderer(offscreen);
        const pixcelbuffer = new Uint8Array(size.x * size.y * 4);

        this.gl.readPixels(
            location.x,
            location.y,
            size.x,
            size.y,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            pixcelbuffer
        );

        return pixcelbuffer;
    }

    /**
     * オフスクリーンレンダリングをセットアップ
     * @param offscreenRenderer オフスクリーンレンダラ
     */
    private setUpOffscreenRenderer(offscreenRenderer: OffscreenRenderer | null) {
        if (offscreenRenderer === null) {
            OffscreenRenderer.removeOffscreenRenderer(this.gl);
        } else {
            offscreenRenderer.activate();
        }
    }
}

export { TexRendererSader, TexRenderManager };
