import { Vec } from './Vec';
export class Vec2 implements Vec {
  public x: number;
  public y: number;
  get inverse() {
    return this.clone().times(-1);
  }
  constructor(x: number, y: number);
  constructor(coordArray: [number, number, ...number[]]);
  constructor(a: number | [number, number, ...number[]], b?: number) {
    if (typeof a === 'number' && typeof b === 'number') {
      this.x = a;
      this.y = b;
    } else if (Array.isArray(a)) {
      this.x = a[0];
      this.y = a[1];
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  add(v: Vec2) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  sub(v: Vec2) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  times(n: number) {
    return new Vec2(this.x * n, this.y * n);
  }
  dot(v: Vec2) {
    return this.x * v.x + this.y * v.y;
  }
}
