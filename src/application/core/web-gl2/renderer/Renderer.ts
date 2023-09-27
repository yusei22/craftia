import { WebGL2 } from '../WebGL2';
import { IndexBuffer, IndexBufferData, VertexBufer, VertexBuferData } from '../buffer';
import { Program } from '../program';
import { FragmentShader, VertexShader } from '../shader';
import { IUniformValue } from '../uniforms';
import { VertexArray } from '../vertices';
type RenderOptions = {
    mode?: GLenum;
    type?: GLenum;
    offset?: number;
};
type AttributeParams = {
    name: string,
    size: number,
    stride: number,
    offset: number
}
class ElementsRenderer extends WebGL2 {
    private program?: Program;
    private fragmentShaderSource: string = '';
    private vertexShaderSource: string = '';
    private vao: VertexArray;
    private bufferElementCount: number = 0;
    constructor() {
        super();
        this.vao = new VertexArray(this.gl2);
    }
    public getCanvas(): HTMLCanvasElement | OffscreenCanvas {
        return super.getCanvas();
    }
    /**
     * フラグメントシェーダーのソースをセット
     * @param fragmentShaderSource フラグメントシェーダーのソース
     * @returns
     */
    public attachFragmentShaderSource(fragmentShaderSource: string) {
        this.fragmentShaderSource = fragmentShaderSource;
        return this;
    }
    /**
     * 頂点シェーダーのソースをセット
     * @param vertexShaderSource 頂点シェーダーのソース
     * @returns
     */
    public attachVertexShaderSource(vertexShaderSource: string) {
        this.vertexShaderSource = vertexShaderSource;
        return this;
    }
    /**
     * シェーダーをコンパイルして使える状態にする
     * @returns
     */
    public compileShader() {
        const fragmentShader = new FragmentShader(this.gl2, this.fragmentShaderSource);
        const vertexShader = new VertexShader(this.gl2, this.vertexShaderSource);
        this.program = new Program(this.gl2, vertexShader, fragmentShader);
        return this;
    }
    /**
     * ユニフォーム(整数型)の値を設定
     * @param name ユニフォームの名前
     * @param value 値
     * @returns
     */
    public setUniformIntValue<T extends IUniformValue>(name: string, value: T) {
        this.program?.getUniformInt(name).set(value);
        return this;
    }
    /**
     * ユニフォーム(浮動小数点型)の値を設定
     * @param name ユニフォームの名前
     * @param value 値
     * @returns
     */
    public setUniformFloatValue<T extends IUniformValue>(name: string, value: T) {
        this.program?.getUniformFloat(name).set(value);
        return this;
    }
    /**頂点属性をセット
     * @param name
     * @param size
     * @param stride
     * @param offset
     * @returns
     */
    public setAttributes(...attributes: AttributeParams[]) {
        if (!this.program) return this;

        this.vao.bind();
        attributes.forEach((attr) => {
            const attribute = this.program?.getAttribute(attr.name, attr.size, attr.stride, attr.offset);
            attribute?.setPointer(this.gl2);
        })
        this.vao.unbind();
    }
    /**
     * インデックスバッファデータを設定
     * @param indexData インデックスバッファデータ
     */
    public setIndexBufferData(indexData: IndexBufferData) {
        const ibo = new IndexBuffer(this.gl2).setData(indexData);

        this.vao.bind();
        ibo.bind();
        this.vao.unbind();
        this.bufferElementCount = ibo.length;
    }
    /**
     * 頂点バッファデータを設定
     * @param vertexBuferData 頂点バッファデータ
     */
    public setVertexBufferData(vertexBuferData: VertexBuferData) {
        const vbo = new VertexBufer(this.gl2).setData(vertexBuferData);

        this.vao.bind();
        vbo.bind();
        this.vao.unbind();
    }
    /**
     * バッファデータを設定
     * @param indexData 頂点バッファデータ
     * @param vertexBuferData インデックスバッファデータ
     */
    public setBufferData(indexData: IndexBufferData, vertexBuferData: VertexBuferData) {
        this.vao.bind();
        const vbo = new VertexBufer(this.gl2).setData(vertexBuferData);
        const ibo = new IndexBuffer(this.gl2).setData(indexData);
        ibo.bind();
        vbo.bind();
        this.vao.unbind();
    }
    /**
     * レンダリング
     * @param param0 レンダリングオプション
     */
    public render({ mode, type, offset }: RenderOptions = {}) {
        this.vao.bind();
        this.program?.use();

        this.gl2.drawElements(
            mode ?? this.gl2.TRIANGLES,
            this.bufferElementCount,
            type ?? this.gl2.UNSIGNED_SHORT,
            offset ?? 0
        );
        this.vao.unbind();
    }
}
