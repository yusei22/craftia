import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../../layer-settings/SystemLayerSettings';
import { ILayerImageSource } from '../../Ilayer';
import { createSmartImgBitmapLayer } from '../../smart-object/SmartImgBitmapLayer';
import { createSmartImgElementLayer } from '../../smart-object/SmartImgElementLayer';
import { Ctx2DLayer } from '../Ctx2DLayer';
import { Vec2 } from 'application/units';

class SmartCtx2DLayer extends Ctx2DLayer {
  public settings: LayerSettings;
  private _systemSettings: SystemLayerSettings;
  public get systemSettings() {
    return this._systemSettings;
  }
  constructor(context: CanvasRenderingContext2D, settings: LayerSettings, resize: Vec2, source?: ILayerImageSource) {
    super(context);
    this.settings = settings.clone();
    this._systemSettings = new SystemLayerSettings({ resize: resize });
    if (source) {
      this.clear();
      this.viewportCanvas(new Vec2(source.width, source.height));
      this.drawImage(source, new Vec2(0, 0));
    }
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
export { SmartCtx2DLayer };
