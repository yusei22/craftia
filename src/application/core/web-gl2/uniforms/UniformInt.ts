import { GLProgram } from '../shader/GLProgram';
import { IGLUniformValue } from './IGLUniform';

export class UniformInt {
    public readonly name: string;
    public readonly value: IGLUniformValue;

    constructor(name: string, value: IGLUniformValue) {
        this.name = name;
        this.value = value;
    }
    public getGLUniform(program: GLProgram) {
        return program.getUniformInt(this.name, this.value);
    }
}
