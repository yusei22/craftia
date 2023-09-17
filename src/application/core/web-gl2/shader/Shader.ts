/**
 * WebGLのシェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
class Shader {
    readonly webGLShader: WebGLShader;
    readonly type: GLenum;
    /**
     * @param gl WebGL2のコンストラクター
     * @param type シェーダーのタイプ。
     * - `gl.VERTEX_SHADER`
     * - `gl.FRAGMENT_SHADER`
     * @param source GLSLシェーダーソース
     */
    constructor(gl: WebGL2RenderingContext, type: GLenum, source: string) {
        if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
            const info = 'Invalid shader type.';
            throw new Error(info);
        }

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

export { Shader };
