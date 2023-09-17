import { Mat, Vec2, Vec3, Vec4 } from 'application/core/units';

type IUniformValue = Mat | Vec2 | Vec3 | Vec4 | number;
interface IUniform<T extends IUniformValue, U extends string = string> {
    readonly name: U;
    set(value: T): void;
}
export type { IUniform, IUniformValue };
