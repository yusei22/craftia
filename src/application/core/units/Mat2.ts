import { Mat, TypedArray } from './Mat';

export class Mat2 extends Mat<2, number> {
    constructor(item: TypedArray | number[]) {
        const width = 2;
        const heigth = Math.floor(item.length / width);
        super(item, [width, heigth]);
    }
}
