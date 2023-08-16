import { TypedArray } from '../types';
import { Mat } from './Mat';
export class Mat2 extends Mat {
  constructor(item: TypedArray | number[]) {
    const width = 2;
    const heigth = Math.floor(item.length / width);
    super(item, [width, heigth]);
  }
}
