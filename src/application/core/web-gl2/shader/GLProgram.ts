import { IGLUniformValue, GLUniformFloat, GLUniformInt } from '../uniforms';
import { GLFragmentShader, GLVertexShader } from '.';

/**
 * WebGLのプログラムを管理するクラス。
 * ソースをコンパイルしたWebGLProgramを保持。
 */
export class GLProgram {
    readonly gl: WebGL2RenderingContext;
    private webGLprogram: WebGLProgram;
    private vertexShader: GLVertexShader;
    private fragmentShader: GLFragmentShader;
    /**
     * @param gl WebGL2のコンストラクター
     * @param vertexShader `gzVertexShader`インスタンス
     * @param fragmentShader `gzFragmentShader`インスタンス
     */
    constructor(
        gl: WebGL2RenderingContext,
        vertexShader: GLVertexShader,
        fragmentShader: GLFragmentShader
    ) {
        this.gl = gl;
        const program = this.gl.createProgram() as WebGLProgram;

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.gl.attachShader(program, this.vertexShader.webGLShader);
        this.gl.attachShader(program, this.fragmentShader.webGLShader);
        this.gl.linkProgram(program);

        const linkStatus = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);

        if (linkStatus) {
            this.webGLprogram = program;
        } else {
            const info = this.gl.getProgramInfoLog(program) ?? 'Failed to link program.';
            this.gl.deleteProgram(program);
            throw Error(info);
        }
    }

    /**
     * プログラムをアクティブにする
     */
    public use() {
        this.gl.useProgram(this.webGLprogram);
    }

    /**
     * 任意のin変数の位置を取得。
     * @param name in変数の名前
     * @returns in変数の位置
     */
    public getAttribLocation(name: string) {
        return this.gl.getAttribLocation(this.webGLprogram, name);
    }

    /**
     * 任意のuniform変数の位置を取得。
     * @param name uniform変数の名前
     * @returns uniform変数の位置
     */
    public getUniformLocation(name: string) {
        return this.gl.getUniformLocation(this.webGLprogram, name);
    }
    /**
     * uniform変数(浮動小数型)を取得
     * @param name 名前
     * @returns `UniformFloat`
     */
    public getUniformFloat<T extends IGLUniformValue>(name: string, value: T) {
        return new GLUniformFloat<T>(this.gl, this.getUniformLocation(name), value);
    }
    /**
     * uniform変数(整数型)を取得
     * @param name 名前
     * @returns `UniformInt`
     */
    public getUniformInt<T extends IGLUniformValue>(name: string, value: T) {
        return new GLUniformInt<T>(this.gl, this.getUniformLocation(name), value);
    }
    /**
     * プログラムを破棄する
     */
    public destroy() {
        this.gl.deleteProgram(this.webGLprogram);
    }
}
