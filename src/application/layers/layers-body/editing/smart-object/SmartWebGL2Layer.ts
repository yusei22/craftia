import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../../layer-settings/SystemLayerSettings';
import { createSmartImgBitmapLayer } from '../../smart-object/SmartImgBitmapLayer';
import { createSmartImgElementLayer } from '../../smart-object/SmartImgElementLayer';
import { WebGL2Layer } from '../WebGL2Layer';
import { Vec2 } from 'application/units';

class SmartWebGL2Layer extends WebGL2Layer {
  public settings: LayerSettings;
  private _systemSettings: SystemLayerSettings;
  get systemSettings() {
    return this._systemSettings;
  }
  constructor(gl2: WebGL2RenderingContext, settings: LayerSettings, resize: Vec2) {
    super(gl2);
    this.settings = settings.clone();
    this._systemSettings = new SystemLayerSettings({ resize: resize });
  }
  public viewportCanvas(size: Vec2): void {
    super.viewport(size);
  }
  public changeResizeSettings(newSize: Vec2) {
    this._systemSettings = this._systemSettings.cloneEdit({ resize: newSize });
  }
  public createSmartImgBitmapLayer() {
    return createSmartImgBitmapLayer(this.canvas, this.settings, this.systemSettings.resize);
  }
  public createSmartImgElementLayer() {
    const dataURL = this.canvas.toDataURL();
    return createSmartImgElementLayer(dataURL, this.settings, this.systemSettings.resize);
  }
}
export { SmartWebGL2Layer };
