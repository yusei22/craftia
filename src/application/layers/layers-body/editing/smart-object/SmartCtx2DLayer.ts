import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../../layer-settings/SystemLayerSettings';
import { ILayerImageSource } from '../../Ilayer';
import { createRasterizedImgBitmapLayer } from '../../rasterized/RasterizedImgBitmapLayer';
import { createRasterizedImgElementLayer } from '../../rasterized/RasterizedImgElementLayer';
import { createSmartImgBitmapLayer } from '../../smart-object/SmartImgBitmapLayer';
import { createSmartImgElementLayer } from '../../smart-object/SmartImgElementLayer';
import { Ctx2DLayer } from '../Ctx2DLayer';
import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import { Vec2 } from 'application/units';

class SmartCtx2DLayer extends Ctx2DLayer {
  public settings: LayerSettings;
  private _systemSettings: SystemLayerSettings;
  public get systemSettings() {
    return this._systemSettings;
  }
  constructor(settings: LayerSettings, resize: Vec2, source?: ILayerImageSource) {
    super();
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
  public createRasterizedImgBitmapLayer() {
    const rasterizedSource = this.createRasterizedSource();
    return createRasterizedImgBitmapLayer(rasterizedSource, this.settings);
  }
  public createRasterizedImgElementLayer() {
    const rasterizedSource = this.createRasterizedSource();
    const dataURL = rasterizedSource.toDataURL();
    return createRasterizedImgElementLayer(dataURL, this.settings);
  }
  public createSmartImgBitmapLayer() {
    return createSmartImgBitmapLayer(this.canvas, this.settings, this.systemSettings.resize);
  }
  public createSmartImgElementLayer() {
    const dataURL = this.canvas.toDataURL();
    return createSmartImgElementLayer(dataURL, this.settings, this.systemSettings.resize);
  }
  private createRasterizedSource() {
    const renderer = new ImageRenderer();
    renderer.viewport(this._systemSettings.resize);
    renderer.drawImage(this.canvas, new Vec2(0, 0), this._systemSettings.resize);
    return renderer.canvas;
  }
}
export { SmartCtx2DLayer };
