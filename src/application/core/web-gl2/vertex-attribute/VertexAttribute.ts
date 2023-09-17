import { Program } from '../program/Program';

/**
 * WebGLの頂点属性を管理するクラス
 */
class VertexAttribute<T extends string = string> {
    readonly gl: WebGL2RenderingContext;
    /**変数の名前 */
    readonly name: T;
    /**Attribute変数の位置 */
    readonly location: GLenum;
    /**頂点属性あたりの要素数 */
    readonly size: number;
    /** 連続する頂点属性の始端どうしの間にある、オフセット数,*/
    readonly stride: number = 0;
    /** 頂点属性配列の最初の要素のオフセット*/
    readonly offset: number = 0;

    /**
     * @param program 変数のあるプログラム
     * @param name 変数の名前
     * @param size 頂点属性あたりの要素数
     * @param stride 連続する頂点属性の始端どうしの間にある、オフセット数
     * @param offset 頂点属性配列の最初の要素のオフセット
     */
    constructor(program: Program, name: T, size: number, stride: number, offset: number) {
        this.name = name;
        this.location = program.getAttribLocation(this.name);
        this.size = size;
        this.stride = stride;
        this.offset = offset;
        this.gl = program.gl;
    }

    public setPointer() {
        this.gl.enableVertexAttribArray(this.location);
        this.gl.vertexAttribPointer(this.location, this.size, this.gl.FLOAT, false, this.stride, this.offset);
    }
}
export { VertexAttribute };
