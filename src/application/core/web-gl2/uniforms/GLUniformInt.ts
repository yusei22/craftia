import { IGLUniform, IGLUniformValue, Vecs, expandVecs } from './IGLUniform';
import { ValueUpdater } from 'application/core/types';
import { Vec2, Vec3, Vec4, isVec } from 'application/core/units';

export class GLUniformInt<T extends IGLUniformValue = IGLUniformValue> implements IGLUniform<T> {
    private readonly gl: WebGL2RenderingContext;
    private readonly location: WebGLUniformLocation | null;
    public readonly value: T;
    constructor(gl2: WebGL2RenderingContext, location: WebGLUniformLocation | null, value: T) {
        this.gl = gl2;
        this.location = location;
        this.value = value;
    }
    public setValue(valOrUpdater: ValueUpdater<T> | T): GLUniformInt<T> {
        return new GLUniformInt(
            this.gl,
            this.location,
            typeof valOrUpdater === 'function' ? valOrUpdater(this.value) : valOrUpdater
        );
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
                this.setVecs(this.value as Vecs);
                return;
            }
            return;
        }
        if (isVec(this.value)) {
            this.setVec(this.value);
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
    private setVecs(vecs: Vecs) {
        if (vecs[0] instanceof Vec2) {
            this.gl.uniform2iv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec3) {
            this.gl.uniform3iv(this.location, expandVecs(vecs));
        } else if (vecs[0] instanceof Vec4) {
            this.gl.uniform4iv(this.location, expandVecs(vecs));
        }
    }
}
