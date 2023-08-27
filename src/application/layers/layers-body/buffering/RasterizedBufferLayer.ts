import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { Ctx2DConsumer } from 'application/canvas/Ctx2DConsumer';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';

class RasterizedBufferLayer extends Ctx2DConsumer {
  /** レイヤーの設定 */
  public settings: LayerSettings;
  /** レイヤーのシステム設定 */
  public get systemSettings() {
    return new SystemLayerSettings({
      resize: new Vec2(this.canvas.width, this.canvas.height),
    });
  }
  /**バッファリング先のcanvas */
  public get canvas() {
    return this.getCanvas();
  }
  /**レイヤーのソース */
  public get source() {
    return this.canvas;
  }
  /** オリジナルのレイヤーの設定 */
  private originalSettings: LayerSettings;

  /**
   * @param context ベースのコンテクスト
   * @param layer バッファリングするレイヤー
   */
  constructor(context: CanvasRenderingContext2D, layer: Layer) {
    super(context);
    this.setLayer(layer);
    this.settings = layer.settings.clone();
    this.originalSettings = layer.settings.clone();
  }
  private setLayer(layer: Layer) {
    this.clear();
    this.viewport(layer.systemSettings.resize);
    this.drawImage(layer.source, new Vec2(0, 0), layer.systemSettings.resize);
  }

  /**
   * 設定を全てリセット
   * @returns 自身のクラス
   */
  public resetAllSettings() {
    this.settings = new LayerSettings();
    return this;
  }

  /**
   * 元の設定を全て復元
   * @returns
   */
  public restoreAllSettings() {
    this.settings = this.originalSettings.clone();
    return this;
  }
  /**
   * バッファを破壊
   */
  public destroy() {
    super.destroy();
  }
  /**
   * ImageDataを取得する
   * @param location 取得開始位置
   * @param size 取得するサイズ
   * @returns 取得したImageData
   */
  public getImageData(location: Vec2, size: Vec2): ImageData {
    return super.getImageData(location, size);
  }
  /**
   * レイヤーの設定を変更する
   * @param editItem
   * @returns 自身のクラス
   */
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { RasterizedBufferLayer };
