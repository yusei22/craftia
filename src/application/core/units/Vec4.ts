import { IVec, Vec } from './Vec';
import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';
export class Vec4 implements IVec {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
    public get xy() {
        return new Vec2(this.x, this.y);
    }
    public get xyz() {
        return new Vec3(this.x, this.y, this.z);
    }
    public get xyzw() {
        return this;
    }
    public get r() {
        return this.x;
    }
    public get g() {
        return this.y;
    }
    public get b() {
        return this.z;
    }
    public get a() {
        return this.w;
    }
    public get rg() {
        return this.xy;
    }
    public get rgb() {
        return this.xyz;
    }
    public get rgba() {
        return this;
    }
    public get inverse() {
        return this.times(-1);
    }
    constructor(xyzw: number);
    constructor(x: number, y: number, z: number, w: number);
    constructor(coordArray: [number, number, number, number, ...number[]]);
    constructor(
        a: number | [number, number, number, number, ...number[]],
        b?: number,
        c?: number,
        d?: number
    ) {
        if (
            typeof a === 'number' &&
            typeof b === 'number' &&
            typeof c === 'number' &&
            typeof d === 'number'
        ) {
            this.x = a;
            this.y = b;
            this.z = c;
            this.w = d;
        } else if (typeof a === 'number') {
            this.x = a;
            this.y = a;
            this.z = a;
            this.w = a;
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
    public add(v: Vec4): Vec4 {
        return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    public sub(v: Vec4): Vec4 {
        return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    public times(n: number): Vec4 {
        return new Vec4(this.x * n, this.y * n, this.z * n, this.w * n);
    }
    public dot(v: Vec4): number {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    public cross(v: Vec4): Vec3 {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vec3(x, y, z);
    }
    public equal(v: Vec): boolean {
        return (
            v instanceof Vec4 &&
            v.x === this.x &&
            v.y === this.y &&
            v.z === this.z &&
            v.w === this.w
        );
    }
    public distance(v: Vec4): number {
        return Math.sqrt(
            (v.x - this.x) ** 2 + (v.y - this.y) ** 2 + (v.z - this.z) ** 2 + (v.w - this.w) ** 2
        );
    }
    public toArray(): [number, number, number, number] {
        return [this.x, this.y, this.z, this.w];
    }
}
