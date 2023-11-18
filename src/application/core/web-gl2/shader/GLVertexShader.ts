import { GLShader } from './GLShader';

/**
 * WebGLの頂点シェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
export class GLVertexShader extends GLShader {
    /**
     * @param gl WebGL2のコンストラクター
     * @param source GLSLシェーダーソース
     */
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, gl.VERTEX_SHADER, source);
    }
}
