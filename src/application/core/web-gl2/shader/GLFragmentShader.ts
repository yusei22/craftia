import { GLShader } from './GLShader';

/**
 * WebGLのフラグメントシェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
export class GLFragmentShader extends GLShader {
    /**
     * @param gl WebGL2のコンストラクター
     * @param source GLSLシェーダーソース
     */
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, gl.FRAGMENT_SHADER, source);
    }
}
