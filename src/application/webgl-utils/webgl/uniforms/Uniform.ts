import { Mat2, Mat3, Mat4, Vec2, Vec3, Vec4 } from '../../../units';

type UniformValue = Mat2 | Mat3 | Mat4 | Vec2 | Vec3 | Vec4 | number;
interface Uniform {
  set(value: UniformValue | UniformValue): void;
}
export type { Uniform, UniformValue };
