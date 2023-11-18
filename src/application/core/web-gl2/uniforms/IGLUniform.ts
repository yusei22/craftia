import { Vec2, Vec3, Vec4 } from 'application/core/units';

export type Vecs = Vec2[] | Vec3[] | Vec4[];

export type IGLUniformValue = number | Vec2 | Vec3 | Vec4 | number[] | Vec2[] | Vec3[] | Vec4[];

export interface IGLUniform<T extends IGLUniformValue = IGLUniformValue> {
    transfer(): void;
    readonly value: T;
}

export function expandVecs(vecs: Vec2[] | Vec3[] | Vec4[]) {
    const arr: number[] = [];
    vecs.forEach((vec) => {
        arr.push(...vec.toArray());
    });
    return arr;
}
