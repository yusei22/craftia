import { Mat, TypedArray } from './Mat';
export class Mat3 extends Mat<3, number> {
    constructor(item: TypedArray | number[]) {
        const width = 3;
        const heigth = Math.floor(item.length / width);
        super(item, [width, heigth]);
    }
}
