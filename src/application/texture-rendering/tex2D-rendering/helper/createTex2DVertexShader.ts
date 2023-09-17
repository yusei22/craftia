import { A_positionName, A_textureCoordName, U_flipYName, U_resolutionName } from '../types';
import { VertexShader } from 'application/core/web-gl2';
/**
 * 頂点シェーダーを作る
 * @param gl webgl2コンテクスト
 * @param param1
 * @param param1.v_textureCoordName テクスチャ座標の`Varying`の名前
 * @returns 頂点シェーダー
 */
function createTex2DVertexShader(
    gl: WebGL2RenderingContext,
    { v_textureCoordName }: { v_textureCoordName: string }
) {
    const a_position: A_positionName = 'a_position';
    const a_textureCoord: A_textureCoordName = 'a_textureCoord';
    const u_resolution: U_resolutionName = 'u_resolution';
    const u_flipY: U_flipYName = 'u_flipY';

    const vertexShaderSource = /*glsl */ `#version 300 es
  
      in vec2 ${a_position};
      in vec2 ${a_textureCoord};
      uniform vec2 ${u_resolution};
      uniform float ${u_flipY};
      out vec2 ${v_textureCoordName};
  
      vec2 coordNormalize(vec2 pixcelCoord) {
          vec2 normalizedCoord = (pixcelCoord / ${u_resolution} * 2.0) - 1.0;
          return normalizedCoord * vec2(1.0, ${u_flipY});
      }
  
      void main() {
          ${v_textureCoordName} =  ${a_textureCoord};
          vec2 normalizedCoord = coordNormalize( ${a_position} );
          gl_Position = vec4(normalizedCoord, 0, 1);
      }`;
    return new VertexShader(gl, vertexShaderSource);
}
export { createTex2DVertexShader };
