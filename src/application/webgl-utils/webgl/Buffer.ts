/**
 * WegGLのバッファを管理するクラス。
 * 情報を格納したWebGLBufferを作成、保持。
 */
class Buffer {
  private gl: WebGL2RenderingContext;
  private webGLBuffer: WebGLBuffer;
  readonly usage: GLenum;
  readonly type: GLenum;
  /**
   * @param gl WebGL2のコンストラクター
   * @param type 結合する場所 (ターゲット) を指定する GLenum
   * @param bufferData データストアへ格納する型付き配列
   * @param param4
   * @param param4.usage データストアの用途を指定する GLenum
   */
  constructor(
    gl: WebGL2RenderingContext,
    type: GLenum,
    bufferData: ArrayBuffer,
    { usage = gl.STATIC_DRAW }: { usage?: GLenum } = {}
  ) {
    this.gl = gl;
    this.type = type;
    this.webGLBuffer = gl.createBuffer() as WebGLBuffer;
    this.usage = usage;
    this.gl.bindBuffer(this.type, this.webGLBuffer);
    this.gl.bufferData(this.type, bufferData, this.usage);
    this.unbind();
  }
  /**
   * バッファをバインドする
   */
  bind() {
    this.gl.bindBuffer(this.type, this.webGLBuffer);
  }
  /**
   * WebGLコンテキストに`null`をバインドする。
   */
  unbind() {
    this.gl.bindBuffer(this.type, null);
  }
}
/**gzIboに渡せる`ArrayBuffer` */
type IndexBufferData = Int8Array | Int16Array | Int32Array;
/**
 * WegGLのインデックスバッファを管理するクラス。
 * インデックスの情報を格納したWebGLBufferを保持。
 */
class IBO extends Buffer {
  /**
   * @param gl WebGL2のコンストラクター
   * @param bufferData データストアへ格納する型付き配列
   * @param param3
   * @param param3.usage データストアの用途を指定する GLenum
   */
  constructor(gl: WebGL2RenderingContext, bufferData: IndexBufferData, { usage }: { usage?: GLenum } = {}) {
    super(gl, gl.ELEMENT_ARRAY_BUFFER, bufferData, { usage });
  }
}
/**gzVboに渡せる`ArrayBuffer` */
type VertexBuferData = Float32Array | Float64Array;
/**
 * WegGLの頂点バッファを管理するクラス。
 * 頂点情報を格納したWebGLBufferを保持。
 */
class VBO extends Buffer {
  /**
   * @param gl WebGL2のコンストラクター
   * @param bufferData データストアへ格納する型付き配列
   * @param param3
   * @param param3.usage データストアの用途を指定する GLenum
   */
  constructor(gl: WebGL2RenderingContext, bufferData: VertexBuferData, { usage }: { usage?: GLenum } = {}) {
    super(gl, gl.ARRAY_BUFFER, bufferData, { usage });
  }
}
export { Buffer, IBO, VBO };
export type { IndexBufferData, VertexBuferData };
