import { FragmentShader } from 'application/core/web-gl2';
type TexRendererVarNames = {
    /** テクスチャ`sampler2D`のUniform*/
    textureUniform: string;
    /**テクスチャ座標のVarying*/
    textureCoordVarying: string;
};

class TexRendererSader extends FragmentShader {
    readonly varNames: TexRendererVarNames;
    constructor(gl: WebGL2RenderingContext, source: string, essentialVarNames: TexRendererVarNames) {
        super(gl, source);
        this.varNames = essentialVarNames;
    }
}
export { TexRendererSader };
