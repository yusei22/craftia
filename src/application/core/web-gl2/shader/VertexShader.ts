import { Shader } from './Shader';

/**
 * WebGLの頂点シェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
class VertexShader extends Shader {
    /**
     * @param gl WebGL2のコンストラクター
     * @param source GLSLシェーダーソース
     */
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, gl.VERTEX_SHADER, source);
    }
}

export { VertexShader };
