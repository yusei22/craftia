import { Shader } from '../shader';
import { IGLUniform } from './IGLUniform';
import { UniformFloat } from './UniformFloat';
import { UniformInt } from './UniformInt';

export class UniformGroup {
    public readonly uniforms: (UniformFloat | UniformInt)[];

    private glUniforms: Map<number, IGLUniform[]>;

    constructor(uniforms: (UniformFloat | UniformInt)[]) {
        this.glUniforms = new Map();
        this.uniforms = uniforms;
    }
    public transfer(shader: Shader) {
        let glUnifomrs = this.glUniforms.get(shader.program.uid);

        if (!glUnifomrs) {
            glUnifomrs = shader.program.getGLUnifomrs(this.uniforms);
            this.glUniforms.set(shader.program.uid, glUnifomrs);
        }

        glUnifomrs.forEach((u) => u.transfer());
        return this;
    }
}
