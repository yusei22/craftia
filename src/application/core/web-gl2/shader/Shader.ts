import { UniformFloat } from '../uniforms/UniformFloat';
import { UniformGroup } from '../uniforms/UniformGroup';
import { UniformInt } from '../uniforms/UniformInt';
import { Program } from './Program';

export class Shader {
    public readonly program: Program;
    public readonly uniforms: UniformGroup;

    /**
     * シェーダーを作成する
     * @param program シェーダーのプログラム
     * @param uniforms シェーダーのuniform変数
     */
    constructor(program: Program, uniforms: (UniformFloat | UniformInt)[] | UniformGroup) {
        this.program = program;
        this.uniforms = uniforms instanceof UniformGroup ? uniforms : new UniformGroup(uniforms);
    }

    /**
     * シェーダーソースとuniform変数からシェーダーを作成する
     * @param vertexSrc 頂点シェーダーソース
     * @param fragmentSrc フラグメントシェーダーソース
     * @param uniforms uniform変数
     * @returns 新規シェーダー
     */
    static from(vertexSrc: string, fragmentSrc: string, uniforms: (UniformFloat | UniformInt)[]) {
        return new Shader(new Program(vertexSrc, fragmentSrc), uniforms);
    }
    public destroy(): this {
        this.program.destroy();

        return this;
    }
    public bind(): this {
        this.program.bind();
        this.uniforms.transfer(this);

        return this;
    }
}
