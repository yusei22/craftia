/**頂点座標：Vec2 */
const VERTEX_SIZE = 2;
/**テクスチャ座標：Vec2  */
const TEXTURE_SIZE = 2;
/** データ1セットあたりのサイズ */
const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT;
/**頂点座標のオフセット */
const VERTEX_OFFSET = 0;
/** テクスチャ座標のオフセット*/
const TEXTURE_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

export { VERTEX_SIZE, TEXTURE_SIZE, STRIDE, VERTEX_OFFSET, TEXTURE_OFFSET };
