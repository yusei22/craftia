import { Mat } from "./Mat";
import { TypedArray } from "../types";
export class Mat3 extends Mat {
    constructor(item: TypedArray | number[]) {
        const width = 3;
        const heigth = Math.floor(item.length / width)
        super(item, [width, heigth]);
    }
}