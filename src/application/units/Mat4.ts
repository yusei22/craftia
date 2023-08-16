import { TypedArray } from '../types';
import { Mat } from './Mat';
export class Mat4 extends Mat {
  constructor(item: TypedArray | number[]) {
    const width = 4;
    const heigth = Math.floor(item.length / width);
    super(item, [width, heigth]);
  }
}
