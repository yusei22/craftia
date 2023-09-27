import { Vec2, Vec3, Vec4 } from 'application/core/units';

type IUniformValue = number | Vec2 | Vec3 | Vec4 | number[] | Vec2[] | Vec3[] | Vec4[];
interface IUniform<T extends IUniformValue> {
    set(value: T): void;
}

function expandVecs(vecs: Vec2[] | Vec3[] | Vec4[]) {
    const arr: number[] = [];
    vecs.forEach((vec) => {
        arr.push(...vec.toArray());
    });
    return arr;
}
export { expandVecs };
export type { IUniform, IUniformValue };
