import { FragmentShader, VertexShader } from '../shader';
import { IUniformValue, UniformFloat, UniformInt } from '../uniforms';
import { VertexAttribute } from '../vertex-attribute';
/**
 * WebGLのプログラムを管理するクラス。
 * ソースをコンパイルしたWebGLProgramを保持。
 */
class Program {
    readonly gl: WebGL2RenderingContext;
    private webGLprogram: WebGLProgram;
    private vertexShader: VertexShader;
    private fragmentShader: FragmentShader;
    /**
     * @param gl WebGL2のコンストラクター
     * @param vertexShader `gzVertexShader`インスタンス
     * @param fragmentShader `gzFragmentShader`インスタンス
     */
    constructor(
        gl: WebGL2RenderingContext,
        vertexShader: VertexShader,
        fragmentShader: FragmentShader
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
    public getUniformFloat<T extends IUniformValue>(name: string) {
        return new UniformFloat<T>(this.gl, this.getUniformLocation(name));
    }
    /**
     * uniform変数(整数型)を取得
     * @param name 名前
     * @returns `UniformInt`
     */
    public getUniformInt<T extends IUniformValue>(name: string) {
        return new UniformInt<T>(this.gl, this.getUniformLocation(name));
    }
    /**
     * 頂点属性を取得
     * @param name 名前
     * @param size 頂点属性あたりの要素数
     * @param stride 連続する頂点属性の始端どうしの間にある、オフセット数
     * @param offset 頂点属性配列の最初の要素のオフセット
     * @returns `VertexAttribute`
     */
    public getAttribute(name: string, size: number, stride: number, offset: number) {
        return new VertexAttribute(this.getAttribLocation(name), size, stride, offset);
    }
}
export { Program };
