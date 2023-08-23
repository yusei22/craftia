import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { Ctx2DConsumer } from 'application/canvas/Ctx2DConsumer';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';

class RasterizedBufferLayer extends Ctx2DConsumer {
  public settings: LayerSettings;
  private originalSettings: LayerSettings;
  public get systemSettings() {
    return new SystemLayerSettings({
      resize: new Vec2(this.canvas.width, this.canvas.height),
    });
  }
  public get canvas() {
    return this.getCanvas();
  }
  public get source() {
    return this.canvas;
  }
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
  public resetAllSettings() {
    this.settings = new LayerSettings();
  }
  public restoreAllSettings() {
    this.settings = this.originalSettings.clone();
  }
  public EditSettings(editItem: Partial<LayerSettingsParam>) {
    const newSettings = this.settings.cloneEdit(editItem);
    this.settings = newSettings;
  }
  public destroy() {
    super.destroy();
  }
  public getImageData(location: Vec2, size: Vec2): ImageData {
    return super.getImageData(location, size);
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { RasterizedBufferLayer };
