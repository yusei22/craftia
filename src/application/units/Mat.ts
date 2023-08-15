import { TypedArray } from "../types";
/**行列 */
export class Mat {
    /**行列の横幅 */
    readonly width: number = 0;
    /**行列の高さ */
    readonly heigth: number = 0;
    /**行列の要素数 */
    get weight() {
        return this.width * this.heigth | 0;
    }
    /**行列の要素を保持する`配列` */
    readonly itemArray: number[] = []
    /**
     * @param item 行列の要素
     * @param shape 行列の横幅、高さ `[m行,xn列]`
     * @param matType 内包するTypedArrayの型
     */
    constructor(item: TypedArray | number[], shape: [number, number]) {
        if (item.length < shape[0] * shape[1]) {
            console.error('Invalid array length');
            return;
        }
        if (shape[0] < 1 || shape[1] < 1) {
            console.error('Invalid matrix size');
            return;
        }
        this.width = Math.floor(shape[0]);
        this.heigth = Math.floor(shape[1]);
        if (item instanceof ArrayBuffer) {
            this.itemArray = Array.from(item);
        }
        else if (item instanceof Array) {
            this.itemArray = item.slice();
        }
    }
    //todo:簡単な計算はできるようにする
}