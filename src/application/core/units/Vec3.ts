import { IVec, Vec } from './Vec';
import { Vec2 } from './Vec2';
export class Vec3 implements IVec {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    public get r() {
        return this.x;
    }
    public get g() {
        return this.y;
    }
    public get b() {
        return this.z;
    }
    public get rg() {
        return new Vec2(this.x, this.y);
    }
    public get rgb() {
        return this;
    }
    public get xy() {
        return new Vec2(this.x, this.y);
    }
    public get xyz() {
        return this;
    }
    public get inverse() {
        return this.times(-1);
    }
    constructor(xyz: number);
    constructor(x: number, y: number, z: number);
    constructor(coordArray: [number, number, number, ...number[]]);
    constructor(a: number | [number, number, number, ...number[]], b?: number, c?: number) {
        if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') {
            this.x = a;
            this.y = b;
            this.z = c;
        } else if (typeof a === 'number') {
            this.x = a;
            this.y = a;
            this.z = a;
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
    public add(v: Vec3): Vec3 {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    public sub(v: Vec3): Vec3 {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    public times(n: number): Vec3 {
        return new Vec3(this.x * n, this.y * n, this.z * n);
    }
    public dot(v: Vec3): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    public cross(v: Vec3): Vec3 {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vec3(x, y, z);
    }
    public equal(v: Vec) {
        return v instanceof Vec3 && v.x === this.x && v.y === this.y && v.z === this.z;
    }
    public distance(v: Vec3): number {
        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2 + (v.z - this.z) ** 2);
    }
    public toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }
}
