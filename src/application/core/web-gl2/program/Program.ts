import { FragmentShader, VertexShader } from '../shader';
/**
 * WebGLのプログラムを管理するクラス。
 * ソースをコンパイルしたWebGLProgramを保持。
 */
class Program {
    readonly webGLprogram: WebGLProgram;
    readonly gl: WebGL2RenderingContext;
    private vertexShader: VertexShader;
    private fragmentShader: FragmentShader;
    /**
     *
     * @param gl WebGL2のコンストラクター
     * @param vertexShader `gzVertexShader`インスタンス
     * @param fragmentShader `gzFragmentShader`インスタンス
     */
    constructor(gl: WebGL2RenderingContext, vertexShader: VertexShader, fragmentShader: FragmentShader) {
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
    use() {
        this.gl.useProgram(this.webGLprogram);
    }
    /**
     * 任意のin変数の位置を取得。
     * @param name in変数の名前
     * @returns in変数の位置
     */
    getAttribLocation(name: string) {
        return this.gl.getAttribLocation(this.webGLprogram, name);
    }
    /**
     * 任意のuniform変数の位置を取得。
     * @param name uniform変数の名前
     * @returns uniform変数の位置
     */
    getUniformLocation(name: string) {
        return this.gl.getUniformLocation(this.webGLprogram, name);
    }
}
export { Program };
