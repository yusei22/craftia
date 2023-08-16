import { Mat2, Mat3, Mat4, Vec2, Vec3, Vec4, Mat, isVec, Vec } from '../../../units';
import { Program } from '../Program';
import { Uniform, UniformValue } from './Uniform';

class UniformInt<T extends UniformValue> implements Uniform {
  private gl: WebGL2RenderingContext;
  private location: WebGLUniformLocation | null;
  constructor(program: Program, name: string) {
    this.gl = program.gl;
    this.location = program.getUniformLocation(name);
  }
  public set(value: T) {
    if (typeof value === 'number') {
      this.setNumber(value);
    } else if (value instanceof Mat) {
      this.setMat(value);
    } else if (isVec(value)) {
      this.setVec(value);
    }
  }
  private setMat(mat: Mat) {
    if (mat instanceof Mat2) {
      this.gl.uniform2iv(this.location, mat.itemArray);
    } else if (mat instanceof Mat3) {
      this.gl.uniform3iv(this.location, mat.itemArray);
    } else if (mat instanceof Mat4) {
      this.gl.uniform4iv(this.location, mat.itemArray);
    } else if (mat instanceof Mat) {
      this.gl.uniform1iv(this.location, mat.itemArray);
    }
  }
  private setVec(vec: Vec) {
    if (vec instanceof Vec2) {
      this.gl.uniform2i(this.location, vec.x, vec.y);
    } else if (vec instanceof Vec3) {
      this.gl.uniform3i(this.location, vec.x, vec.y, vec.z);
    } else if (vec instanceof Vec4) {
      this.gl.uniform4i(this.location, vec.x, vec.y, vec.z, vec.w);
    }
  }
  private setNumber(number: number) {
    this.gl.uniform1i(this.location, number);
  }
}
export { UniformInt };
