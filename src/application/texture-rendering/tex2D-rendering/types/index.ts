import { Vec2 } from 'application/core/units';
import { VertexAttribute, UniformFloat, UniformInt } from 'application/core/web-gl2';

/**頂点座標 */
export type A_positionName = 'a_position';
export type A_position = VertexAttribute<A_positionName>;

/** テクスチャ座標*/
export type A_textureCoordName = 'a_textureCoord';
export type A_textureCoord = VertexAttribute<A_textureCoordName>;

/**画面サイズ */
export type U_resolutionName = 'u_resolution';
export type U_resolution = UniformFloat<Vec2, U_resolutionName>;

/**上下反転 */
export type U_flipYName = 'u_flipY';
export type U_flipY = UniformFloat<number, U_flipYName>;

/**テクスチャ`samlpler2D` */
export type U_texture = UniformInt<number, string>;
