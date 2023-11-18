/**
 * WebGLのシェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
export class GLShader {
    readonly webGLShader: WebGLShader;
    readonly type: GLenum;
    /**
     * @param gl WebGL2のコンストラクター
     * @param type シェーダーのタイプ。
     * - `gl.VERTEX_SHADER`
     * - `gl.FRAGMENT_SHADER`
     * @param source GLSLシェーダーソース
     */
    constructor(
        gl: WebGL2RenderingContext,
        type: WebGL2RenderingContext['VERTEX_SHADER' | 'FRAGMENT_SHADER'],
        source: string
    ) {
        this.type = type;
        const shader = gl.createShader(this.type) as WebGLShader;

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        const ShaderCompileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if (ShaderCompileStatus) {
            this.webGLShader = shader;
        } else {
            const info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);

            throw Error(info + `shadertype:${this.type}`);
        }
    }
}
