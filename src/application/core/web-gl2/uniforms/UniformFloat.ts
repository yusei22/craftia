import { ValueUpdater } from 'application/core/types';
import { IUniform, IUniformValue, expandVecs } from './IUniform';
import { Vec, Vec2, Vec3, Vec4, isVec } from 'application/core/units';

class UniformFloat<T extends IUniformValue> implements IUniform<T> {
    private readonly gl: WebGL2RenderingContext;
    private readonly location: WebGLUniformLocation | null;
    public readonly value: T;
    constructor(gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, value: T) {
        this.gl = gl;
        this.location = location;
        this.value = value;
    }
    public setValue(valOrUpdater: ValueUpdater<T> | T): UniformFloat<T> {
        return new UniformFloat(
            this.gl,
            this.location,
            typeof valOrUpdater === 'function' ? valOrUpdater(this.value) : valOrUpdater
        )
    }
    public transfer() {
        if (typeof this.value === 'number') {
            this.setNumber(this.value);
            return;
        }
        if (Array.isArray(this.value)) {
            if (typeof this.value[0] === 'number') {
                this.setArray(this.value as number[]);
                return;
            }
            if (isVec(this.value[0])) {
                this.setVecs(this.value as Vec2[] | Vec3[] | Vec4[]);
                return;
            }
            return;
        }
        if (isVec(this.value)) {
            this.setVec(this.value);
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
