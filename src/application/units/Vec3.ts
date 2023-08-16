import { Vec } from './Vec';
export class Vec3 implements Vec {
  public x: number;
  public y: number;
  public z: number;
  get inverse() {
    return this.clone().times(-1);
  }
  constructor(x: number, y: number, z: number);
  constructor(coordArray: [number, number, number, ...number[]]);
  constructor(a: number | [number, number, number, ...number[]], b?: number, c?: number) {
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') {
      this.x = a;
      this.y = b;
      this.z = c;
    } else if (Array.isArray(a)) {
      this.x = a[0];
      this.y = a[1];
      this.z = a[2];
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
  }
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }
  add(v: Vec3) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  sub(v: Vec3) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  times(n: number) {
    return new Vec3(this.x * n, this.y * n, this.z * n);
  }
  dot(v: Vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v: Vec3) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vec3(x, y, z);
  }
}
