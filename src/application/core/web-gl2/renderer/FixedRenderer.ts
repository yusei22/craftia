import { Vec2 } from 'application/core/units';
import { WebGL2 } from '../WebGL2';
import { IndexBufferData, VertexBuferData } from '../buffer';
import { OffscreenRenderer } from '../offscreeen';
import { Program } from '../program';
import { FragmentShader, VertexShader } from '../shader';
import { TexOptions, Texture2D } from '../textures';
import { IUniformValue } from '../uniforms';
import { VertexDataProvider } from '../vertices';

type RenderOptions = {
    /**描画するプリミティブの型 */
    mode?: GLenum;
    /**要素の配列バッファーの値の型 */
    type?: GLenum;
    /** 要素の配列バッファー内における倍とオフセット*/
    offset?: number;
    /**オフスクリーンレンダラ */
    offscreen?: OffscreenRenderer | null;
};
type AttributeConfig = {
    /**名前 */
    name: string;
    /**頂点属性あたりの要素数 */
    size: number;
    /** 連続する頂点属性の始端どうしの間にある、オフセット数*/
    stride: number;
    /** 頂点属性配列の最初の要素のオフセット*/
    offset: number;
};
type RendererShaderParam = {
    /**頂点シェーダーのソース */
    vertexShader: string;
    /**フラグメントシェーダーのソース */
    fragmentShader: string;
    /**頂点属性の設定 */
    attributes?: AttributeConfig[];
};

class RendererShader {
    /**頂点シェーダーのソース */
    readonly vertexShaderSource: string;
    /**フラグメントシェーダーのソース */
    readonly fragmentShaderSource: string;
    /**頂点属性の設定 */
    readonly attributeConfigs: AttributeConfig[];

    constructor({ vertexShader, fragmentShader, attributes = [] }: RendererShaderParam) {
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSource = fragmentShader;
        this.attributeConfigs = attributes;
    }
    /**
     * プログラムから頂点属性を取得
     * @param program 
     * @returns 
     */
    public getAttrsFrom(program: Program) {
        return this.attributeConfigs.map((attr) =>
            program.getAttribute(attr.name, attr.size, attr.stride, attr.offset)
        );
    }
}

class RendererBufferData {
    /**インデックスデータ */
    readonly indexData: IndexBufferData;
    /**頂点データ */
    readonly vertexData: VertexBuferData;
    /**
     * @param indexData インデックスデータ
     * @param vertexData 頂点データ
     */
    constructor(indexData: IndexBufferData, vertexData: VertexBuferData) {
        this.indexData = indexData;
        this.vertexData = vertexData;
    }
}
/**
 * WebGlレンダラ  
 * バッファは変更不可。
 */
class FixedRenderer extends WebGL2 {
    /** 頂点データプロバイダ */
    private vertex: VertexDataProvider;
    /** プログラム*/
    private program: Program;

    /**
     * @param gl2 WebGL2コンテクスト
     * @param bufferData 使用するバッファのデータ
     * @param shader 使用するシェーダー
     */
    constructor(
        bufferData: RendererBufferData,
        shader: RendererShader
    ) {
        super();
        //頂点プロバイダ
        this.vertex = new VertexDataProvider(this.gl2, bufferData.indexData, bufferData.vertexData);
        //プログラム
        this.program = new Program(
            this.gl2,
            new VertexShader(this.gl2, shader.vertexShaderSource),
            new FragmentShader(this.gl2, shader.fragmentShaderSource)
        );

        //プログラムから頂点属性を取得しセット
        this.vertex.setAttributes(...shader.getAttrsFrom(this.program));
    }
    /**
     * シェーダーを変更する
     * @param shader 新しいシェーダー
     */
    public changeShader(shader: RendererShader) {
        this.program = new Program(
            this.gl2,
            new VertexShader(this.gl2, shader.vertexShaderSource),
            new FragmentShader(this.gl2, shader.fragmentShaderSource)
        );
        this.vertex.setAttributes(...shader.getAttrsFrom(this.program));
    }
    /**
     * キャンバスを得る
     * @returns キャンパス
     */
    public getCanvas(): HTMLCanvasElement | OffscreenCanvas {
        return super.getCanvas();
    }
    /**
     * 解像度を得る
     * @returns 解像度
     */
    public getResolution(): Vec2 {
        return super.getResolution();
    }
    /**
     * ビューポートを設定
     * @param size ビューポートサイズ
     */
    public viewport(size: Vec2): void {
        super.viewport(size);
    }
    /**
     * レンダラを非アクティブにする
     * @returns 
     */
    public activate() {
        this.vertex.activate();
        this.program.use();
        return this;
    }
    /**
     * レンダラをアクティブにする
     * @returns 
     */
    public deactivate() {
        this.vertex.deactivate();
        return this;
    }
    /**
     * レンダリングを実行  
     * レンダラがアクティブな時のみ使用できる 
     * 
     * @param param0 オプション
     */
    public render({ mode, type, offset, offscreen }: RenderOptions = {}) {
        //オフスクリーンレンダラをセットアップ
        this.setOffscreen(offscreen ?? null);

        //初期化する
        this.gl2.clearColor(0, 0, 0, 0);
        this.gl2.clear(this.gl2.COLOR_BUFFER_BIT);

        //描画
        this.gl2.drawElements(
            mode ?? this.gl2.TRIANGLES,
            this.vertex.bufferElementCount,
            type ?? this.gl2.UNSIGNED_SHORT,
            offset ?? 0
        );
        return this;
    }

    /**
     * 浮動小数点型`uniform`の値を設定  
     * レンダラがアクティブな時のみ使用できる 
     * 
     * @param name 変数名
     * @param value 値
     * @returns 
     */
    public setUniformInt(name: string, value: IUniformValue) {
        this.program.getUniformInt(name).set(value);
        return this;
    }

    /**
     * 整数型`uniform`の値を設定  
     * レンダラがアクティブな時のみ使用できる 
     * 
     * @param name 変数名
     * @param value 値
     * @returns 
     */
    public setUniformFloat(name: string, value: IUniformValue) {
        this.program.getUniformFloat(name).set(value);
        return this;
    }
    /**
     * `Sampler2D`型`uniform`の値を設定  
     * レンダラがアクティブな時のみ使用できる 
     * 
     * @param name 変数名
     * @param texture テクスチャ
     * @returns 
     */
    public setUniformSampler2D(name: string, texture: Texture2D) {
        texture.bind();
        this.program.getUniformInt(name).set(texture.unitNumber);
        return this;
    }
    /**
     * テクスチャを作成する
     * @param op テクスチャのオプション
     * @returns 
     */
    public createTexture2D(op?: TexOptions) {
        return new Texture2D(this.gl2, op)
    }
    /**
     * オフスクリーンレンダラを作成する
     * @param size オフスクリーンレンダラのサイズ
     * @returns オフスクリーンレンダラ
     */
    public createOffscreenRenderer(size: Vec2) {
        return new OffscreenRenderer(this.gl2, size);
    }
    /**
     * オフスクリーンレンダラをセット  
     * `null`を指定するとオンスクリーンレンダリングに切り替わる 
     * 
     * レンダラがアクティブな時のみ使用できる 
     * 
     * @param offscreenRenderer `OffscreenRenderer`または`null`
     */
    private setOffscreen(offscreenRenderer: OffscreenRenderer | null) {
        if (offscreenRenderer === null) {
            OffscreenRenderer.removeOffscreenRenderer(this.gl2);
        } else {
            offscreenRenderer.activate();
        }
    }

}
export type { AttributeConfig, RenderOptions };
export { FixedRenderer, RendererShader, RendererBufferData };
