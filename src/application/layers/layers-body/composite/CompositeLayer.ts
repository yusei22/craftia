import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { LayerRenderer } from '../../layers-rendering-system/renderer/LayerRenderer';
import { ILayer } from '../Ilayer';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';

class CompositeLayer implements ILayer {
  /** レンダラ */
  private renderer: LayerRenderer;
  /** レイヤーの設定 */
  public settings: LayerSettings;
  /**レイヤーのシステム設定 */
  public get systemSettings() {
    return new SystemLayerSettings({
      resize: new Vec2(this.source.width, this.source.height),
    });
  }
  /**レイヤーのソース */
  public get source() {
    return this.renderer.canvas;
  }
  /**
   * @param context ベースにするコンストラクタ
   * @param settings レイヤーの設定
   * @param size レイヤーのサイズ
   */
  constructor(context: CanvasRenderingContext2D, settings: LayerSettings, size: Vec2) {
    this.renderer = new LayerRenderer(context);
    this.renderer.viewport(size);
    this.settings = settings.clone();
  }

  /**
   * 描画するレイヤーを変更
   * @param layers 新しいレイヤーの配列
   * @returns 自身のクラス
   */
  public change(layers: Layer[]) {
    if (layers.length <= 0) {
      this.renderer.clear();
      return this;
    }
    this.renderer.redraw(layers);
    return this;
  }

  /**
   * 描画するレイヤーを上に追加
   * @param layers 追加するレイヤーの配列
   * @returns 自身のクラス
   */
  public appened(layers: Layer[]) {
    if (layers.length <= 0) return this;
    this.renderer.drawAbove(layers);
    return this;
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
export { CompositeLayer };
