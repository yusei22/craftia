import { UniformFloat, UniformInt } from '../uniforms';
import { GLFragmentShader } from './GLFragmentShader';
import { GLProgram } from './GLProgram';
import { GLVertexShader } from './GLVertexShader';

let UID = 0;

export class Program {
    public readonly vertexSrc: string;
    public readonly fragmentSrc: string;
    public readonly uid: number;

    private glProgram: GLProgram | null;

    private gl: WebGL2RenderingContext | null;

    constructor(vertexSrc: string, fragmentSrc: string) {
        this.vertexSrc = vertexSrc;
        this.fragmentSrc = fragmentSrc;
        this.uid = UID++;

        this.glProgram = null;
        this.gl = null;
    }
    public getAttribLocation(name: string) {
        if (!this.glProgram) {
            console.warn('Shader not compiled. Please compile the shader first.');
            return -1;
        }
        return this.glProgram.getAttribLocation(name);
    }
    public getGLUnifomrs(uniforms: (UniformFloat | UniformInt)[]) {
        if (!this.glProgram) {
            console.warn('Shader not compiled. Please compile the shader first.');
            return [];
        }

        const program = this.glProgram;
        return uniforms.map((u) => u.getGLUniform(program));
    }
    public compile(gl: WebGL2RenderingContext): this {
        this.generateGLProgram(gl);
        return this;
    }
    public bind(): this {
        if (!this.glProgram) {
            console.warn('Program is not bound. Please compile the program first.');
            return this;
        }
        this.glProgram.use();
        return this;
    }
    protected generateGLProgram(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glProgram) {
            return this.glProgram;
        }

        this.gl = gl;
        return (this.glProgram = new GLProgram(
            gl,
            new GLVertexShader(gl, this.vertexSrc),
            new GLFragmentShader(gl, this.fragmentSrc)
        ));
    }
    public destroy(): this {
        this.glProgram?.destroy();
        this.glProgram = null;

        return this;
    }
}
