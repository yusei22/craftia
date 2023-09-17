import * as tex2DConsts from '../consts';
import { A_position, A_textureCoord } from '../types';
import { Vec2 } from 'application/core/units';
import { Program, VertexAttribute } from 'application/core/web-gl2';
import { VertexDataProvider } from 'application/core/web-gl2/vertices';
/**
 * 頂点のインデックスデータを作る
 * @returns 頂点のインデックスデータ(TypedArray)
 */
function createIndexArray() {
    return new Int16Array([0, 1, 2, 1, 3, 2]);
}

/**
 * 頂点データを作る
 * @param texSize テクスチャのサイズ
 * @param location テクスチャの位置
 * @returns 頂点データ(TypedArray)
 */
function createVertexArray(texSize: Vec2, location: Vec2) {
    const x1 = location.x;
    const x2 = location.x + texSize.x;
    const y1 = location.y;
    const y2 = location.y + texSize.y;

    return new Float32Array([x1, y1, 0.0, 0.0, x1, y2, 0.0, 1.0, x2, y1, 1.0, 0.0, x2, y2, 1.0, 1.0]);
}

/**
 * 頂点プロバイダを作る
 * @param program 紐づけるwebGLプログラム
 * @param texSize テクスチャのサイズ
 * @param texLocation テクスチャの位置
 * @returns 頂点プロバイダ
 */
function createTex2DVertexProvider(program: Program, texSize: Vec2, texLocation: Vec2) {
    const gl = program.gl;
    const indexData = createIndexArray();
    const vertexData = createVertexArray(texSize, texLocation);

    const a_position: A_position = new VertexAttribute(
        program,
        'a_position',
        tex2DConsts.VERTEX_SIZE,
        tex2DConsts.STRIDE,
        tex2DConsts.VERTEX_OFFSET
    );
    const a_textureCoord: A_textureCoord = new VertexAttribute(
        program,
        'a_textureCoord',
        tex2DConsts.TEXTURE_SIZE,
        tex2DConsts.STRIDE,
        tex2DConsts.TEXTURE_OFFSET
    );

    return new VertexDataProvider(gl, indexData, vertexData)
        .addAttribute(a_position)
        .addAttribute(a_textureCoord)
        .transfer();
}
export { createTex2DVertexProvider };
