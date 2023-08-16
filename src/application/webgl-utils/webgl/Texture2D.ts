import { Vec2 } from '../../units';
/** テクスチャ画像の仕様・オプション */
type TexOptions = {
  /** 最大のミップ */
  level?: number;
  /**テクスチャの形式 */
  internalformat?: GLenum;
  /**データの形式 */
  format?: GLenum;
  /**データの種類 */
  type?: GLenum;
  /**使用するテクスチャユニット */
  unitNumber?: number;
  /**境界線の幅。0 である必要がある。 */
  border?: number;
};
/**テクスチャに使用できる画像ののピクセルソース*/
type TexImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap | ImageData;
/** テクスチャに使用できる型付き配列のピクセルソース*/
type TexTypedArray = Uint8Array | Uint16Array | Uint32Array | Float32Array | null;
/**テクスチャに利用できるピクセルソース */
type TexPixcels = TexImageSource | TexTypedArray;
/**
 * WegGLの型付き配列テクスチャを管理するクラス。
 */
class Texture2D {
  /**WebGL2のコンテキスト */
  readonly gl: WebGL2RenderingContext;
  /**内包する`WebGLTexture` */
  readonly webGLTexture: WebGLTexture;
  /**テクスチャのサイズ */
  public size: Vec2 = new Vec2(0, 0);
  /** 最大のミップ */
  readonly level: number;
  /**テクスチャの形式 */
  readonly internalformat: GLenum;
  /**データの形式 */
  readonly format: GLenum;
  /**データの種類 */
  readonly type: GLenum;
  /**使用するテクスチャユニットの番号。1～31 */
  readonly unitNumber: number;
  /**境界線の幅。0 である必要がある。 */
  readonly border: number = 0;
  /**
   * @param gl  WebGL2のコンストラクター
   * @param textureArray テクスチャにする画像
   * @param width テクスチャの横幅
   * @param height テクスチャの高さ
   * @param param3 オプション
   */
  constructor(
    gl: WebGL2RenderingContext,
    {
      level = 0,
      internalformat = gl.RGBA,
      format = gl.RGBA,
      type = gl.UNSIGNED_BYTE,
      unitNumber = 0,
      border = 0,
    }: TexOptions = {}
  ) {
    this.gl = gl;
    if (unitNumber > 31 || unitNumber < 0) {
      console.error('Invalid unit number');
      unitNumber = 0;
    }
    this.webGLTexture = this.gl.createTexture() as WebGLTexture;
    this.level = level;
    this.internalformat = internalformat;
    this.format = format;
    this.type = type;
    this.unitNumber = unitNumber;
    this.border = border;
  }
  bind() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.unitNumber);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.webGLTexture);
  }
  /**
   * 保持しているユニット番号のテクスチャに`null`を登録
   */
  unbind() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.unitNumber);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  /**
   * 保持しているユニット番号のテクスチャをアクティブにする
   */
  refocus() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.unitNumber);
  }
  attachImage(
    pixcels: TexPixcels,
    size: Vec2,
    {
      enableNPOT = true,
      noRepeat = true,
      yCoordinateInversion = false,
    }: {
      enableNPOT?: boolean;
      noRepeat?: boolean;
      yCoordinateInversion?: boolean;
    } = {}
  ) {
    this.size = size.clone();
    this.bind();
    if (ArrayBuffer.isView(pixcels) || pixcels === null) {
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        this.level,
        this.internalformat,
        this.size.x,
        this.size.y,
        this.border,
        this.format,
        this.type,
        pixcels
      );
    } else {
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        this.level,
        this.internalformat,
        this.size.x,
        this.size.y,
        this.border,
        this.format,
        this.type,
        pixcels
      );
    }
    if (enableNPOT) {
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    }
    if (noRepeat) {
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }
    if (yCoordinateInversion) {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    }
    this.unbind();
  }
  attachToframebuffer(attachmentPoint: GLenum = this.gl.COLOR_ATTACHMENT0) {
    this.bind();
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER,
      attachmentPoint,
      this.gl.TEXTURE_2D,
      this.webGLTexture,
      this.level
    );
  }
}
export { Texture2D };
export type { TexPixcels };
