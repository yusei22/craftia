import { IUniform, IUniformValue, expandVecs } from './IUniform';
import { Vec, Vec2, Vec3, Vec4, isVec } from 'application/core/units';

class UniformFloat<T extends IUniformValue> implements IUniform<T> {
    private gl: WebGL2RenderingContext;
    private location: WebGLUniformLocation | null;

    constructor(gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) {
        this.gl = gl;
        this.location = location;
    }
    public set(value: T) {
        if (typeof value === 'number') {
            this.setNumber(value);
            return;
        }
        if (Array.isArray(value)) {
            if (typeof value[0] === 'number') {
                this.setArray(value as number[]);
                return;
            }
            if (isVec(value[0])) {
                this.setVecs(value as Vec2[] | Vec3[] | Vec4[]);
                return;
            }
            return;
        }
        if (isVec(value)) {
            this.setVec(value);
            return;
        }
    }
    private setNumber(number: number) {
        this.gl.uniform1f(this.location, number);
        return;
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
    private setArray(arr: number[]) {
        this.gl.uniform1fv(this.location, arr);
    }
    private setVecs(vecs: Vec2[] | Vec3[] | Vec4[]) {
        if (vecs[0] instanceof Vec2) {
            this.gl.uniform2fv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec3) {
            this.gl.uniform3fv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec4) {
            this.gl.uniform4fv(this.location, expandVecs(vecs));
        }
    }
}
export { UniformFloat };
