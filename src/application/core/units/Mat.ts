type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

class Mat<T extends number = number, U extends number = number> {
    /**行列の横幅 */
    readonly width: T;
    /**行列の高さ */
    readonly heigth: U;
    /**行列の要素` */
    readonly item: number[] = [];

    /**
     * @param item 行列の要素
     * @param param1 `[ 行列の横幅,行列の高さ ]`
     */
    constructor(item: TypedArray | number[], [width, heigth]: [T, U]) {
        if (isCorrectShape(item, [width, heigth])) {
            this.width = width;
            this.heigth = heigth;

            if (item instanceof ArrayBuffer) this.item = Array.from(item);
            if (item instanceof Array) this.item = item.slice();
        } else {
            throw Error('invalid argument');
        }
    }

    public get(index: number): number;
    public get(x: number, y: number): number;
    public get(a: number, b?: number): number {
        if (b) {
            const index = this.width * a + b;
            return this.item[index];
        } else {
            return this.item[a];
        }
    }
}

function isCorrectShape(item: TypedArray | number[], [width, heigth]: [number, number]) {
    if (width < 0 || heigth < 0) return false;
    if (item.length < width * heigth) return false;

    return true;
}
export type { TypedArray };
export { Mat };
