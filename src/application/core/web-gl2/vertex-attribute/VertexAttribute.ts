/**
 * WebGLの頂点属性を管理するクラス
 */
class VertexAttribute {
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
    constructor(location: GLenum, size: number, stride: number, offset: number) {
        this.location = location;
        this.size = size;
        this.stride = stride;
        this.offset = offset;
    }

    public setPointer(gl2: WebGL2RenderingContext) {
        gl2.enableVertexAttribArray(this.location);
        gl2.vertexAttribPointer(
            this.location,
            this.size,
            gl2.FLOAT,
            false,
            this.stride,
            this.offset
        );
    }
}
export { VertexAttribute };
