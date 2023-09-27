import { IUniform, IUniformValue, expandVecs } from './IUniform';
import { Vec, Vec2, Vec3, Vec4, isVec } from 'application/core/units';

class UniformInt<T extends IUniformValue> implements IUniform<T> {
    private gl: WebGL2RenderingContext;
    private location: WebGLUniformLocation | null;
    constructor(gl2: WebGL2RenderingContext, location: WebGLUniformLocation | null) {
        this.gl = gl2;
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
    private setVec(vec: Vec2 | Vec3 | Vec4) {
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
    private setArray(arr: number[]) {
        this.gl.uniform1iv(this.location, arr);
    }
    private setVecs(vecs: Vec2[] | Vec3[] | Vec4[]) {
        if (vecs[0] instanceof Vec2) {
            this.gl.uniform2iv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec3) {
            this.gl.uniform3iv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec4) {
            this.gl.uniform4iv(this.location, expandVecs(vecs));
        }
    }
}
export { UniformInt };
