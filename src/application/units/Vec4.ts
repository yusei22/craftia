import { Vec } from './Vec';
import { Vec3 } from './Vec3';
export class Vec4 implements Vec {
  public x: number;
  public y: number;
  public z: number;
  public w: number;
  get inverse() {
    return this.clone().times(-1);
  }
  constructor(x: number, y: number, z: number, w: number);
  constructor(coordArray: [number, number, number, number, ...number[]]);
  constructor(a: number | [number, number, number, number, ...number[]], b?: number, c?: number, d?: number) {
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
      this.x = a;
      this.y = b;
      this.z = c;
      this.w = d;
    } else if (Array.isArray(a)) {
      this.x = a[0];
      this.y = a[1];
      this.z = a[2];
      this.w = a[3];
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
    }
  }
  clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }
  add(v: Vec4) {
    return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }
  sub(v: Vec4) {
    return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }
  times(n: number) {
    return new Vec4(this.x * n, this.y * n, this.z * n, this.w * n);
  }
  dot(v: Vec4) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  cross(v: Vec4) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vec3(x, y, z);
  }
}
