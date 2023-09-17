import { Program } from '../program/Program';
import { IUniform, IUniformValue } from './IUniform';
import { Mat, Vec, Vec2, Vec3, Vec4, isVec } from 'application/core/units';

class UniformFloat<T extends IUniformValue, U extends string = string> implements IUniform<T, U> {
    readonly name: U;
    private gl: WebGL2RenderingContext;
    private location: WebGLUniformLocation | null;

    constructor(program: Program, name: U) {
        this.gl = program.gl;
        this.name = name;
        this.location = program.getUniformLocation(name);
    }
    public set(value: T) {
        if (typeof value === 'number') {
            this.setNumber(value);
            return;
        }
        if (value instanceof Mat) {
            this.setMat(value);
            return;
        }
        if (isVec(value)) {
            this.setVec(value);
            return;
        }
    }
    private setMat(mat: Mat) {
        if (mat.width === 1) {
            this.gl.uniform1fv(this.location, mat.item);
        } else if (mat.width === 2) {
            this.gl.uniform2fv(this.location, mat.item);
        } else if (mat.width === 3) {
            this.gl.uniform3fv(this.location, mat.item);
        } else if (mat.width === 4) {
            this.gl.uniform4fv(this.location, mat.item);
        }
    }
    private setVec(vec: Vec) {
        if (vec instanceof Vec2) {
            this.gl.uniform2f(this.location, vec.x, vec.y);
        } else if (vec instanceof Vec3) {
            this.gl.uniform3f(this.location, vec.x, vec.y, vec.z);
        } else if (vec instanceof Vec4) {
            this.gl.uniform4f(this.location, vec.x, vec.y, vec.z, vec.w);
        }
    }
    private setNumber(number: number) {
        this.gl.uniform1f(this.location, number);
        return;
    }
}
export { UniformFloat };
