import { TypedArray } from '../types';
import { Mat } from './Mat';
export class Mat3 extends Mat {
  constructor(item: TypedArray | number[]) {
    const width = 3;
    const heigth = Math.floor(item.length / width);
    super(item, [width, heigth]);
  }
}
