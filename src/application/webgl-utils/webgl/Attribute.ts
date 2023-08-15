import { Program } from "./Program";
class Attribute {
    /**in変数の位置 */
    readonly location: GLenum;
    /**頂点属性あたりの要素数 */
    readonly size: number;
    /** 連続する頂点属性の始端どうしの間にある、オフセット数,*/
    readonly stride: number = 0;
    /** 頂点属性配列の最初の要素のオフセット*/
    readonly offset: number = 0;
    constructor(program: Program, name: string, size: number, stride: number, offset: number ) {
        this.location = program.getAttribLocation(name);
        this.size = size;
        this.stride = stride;
        this.offset = offset;
    }
}
export { Attribute }