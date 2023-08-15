import { Mat } from "./Mat";
import { TypedArray } from "../types";
export class Mat2 extends Mat {
    constructor(item: TypedArray | number[]) {
        const width = 2;
        const heigth = Math.floor(item.length / width)
        super(item, [width, heigth]);
    }
}