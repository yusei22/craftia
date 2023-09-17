import { Shader } from './Shader';

/**
 * WebGLのフラグメントシェーダーを管理するクラス。
 * ソースをコンパイルしたWebGLShaderを保持。
 */
class FragmentShader extends Shader {
    /**
     * @param gl WebGL2のコンストラクター
     * @param source GLSLシェーダーソース
     */
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, gl.FRAGMENT_SHADER, source);
    }
}

export { FragmentShader };
