import { Mat, TypedArray } from './Mat';

export class Mat4 extends Mat<4, number> {
    constructor(item: TypedArray | number[]) {
        const width = 4;
        const heigth = Math.floor(item.length / width);
        super(item, [width, heigth]);
    }
}
