import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../../layer-settings/SystemLayerSettings';
import { ILayerImageSource } from '../../Ilayer';
import { RasterizedBufferLayer } from '../../buffering/RasterizedBufferLayer';
import { createRasterizedImgBitmapLayer } from '../../rasterized/RasterizedImgBitmapLayer';
import { createRasterizedImgElementLayer } from '../../rasterized/RasterizedImgElementLayer';
import { createSmartImgBitmapLayer } from '../../smart-object/SmartImgBitmapLayer';
import { createSmartImgElementLayer } from '../../smart-object/SmartImgElementLayer';
import { Ctx2DLayer } from '../Ctx2DLayer';
import { Vec2 } from 'application/units';

type CroppingSettings = {
  upperLeft: Vec2;
  size: Vec2;
};
class RasterizedCtx2DLayer extends Ctx2DLayer {
  public settings: LayerSettings;
  get systemSettings() {
    return new SystemLayerSettings({
      resize: new Vec2(this.canvas.width, this.canvas.height),
    });
  }
  constructor(settings: LayerSettings, source?: ILayerImageSource) {
    super();
    this.settings = settings.clone();
    if (source) {
      this.clear();
      this.viewportCanvas(new Vec2(source.width, source.height));
      this.drawImage(source, new Vec2(0, 0));
    }
  }
  public viewportCanvas(size: Vec2): void {
    super.viewport(size);
  }
  public crop({ upperLeft, size }: CroppingSettings) {
    const buffer = new RasterizedBufferLayer(this);
    const imageData = buffer.getImageData(new Vec2(0, 0), new Vec2(buffer.source.width, buffer.source.height));
    this.viewport(size);
    this.putImageData(imageData, buffer.settings.globalLocation.sub(upperLeft));
    this.settings = this.settings.cloneEdit({
      globalLocation: upperLeft,
    });
  }
  public createRasterizedImgBitmapLayer() {
    return createRasterizedImgBitmapLayer(this.canvas, this.settings);
  }
  public createRasterizedImgElementLayer() {
    const dataURL = this.canvas.toDataURL();
    return createRasterizedImgElementLayer(dataURL, this.settings);
  }
  public createSmartImgBitmapLayer() {
    return createSmartImgBitmapLayer(this.canvas, this.settings, this.systemSettings.resize);
  }
  public createSmartImgElementLayer() {
    const dataURL = this.canvas.toDataURL();
    return createSmartImgElementLayer(dataURL, this.settings, this.systemSettings.resize);
  }
}
export { RasterizedCtx2DLayer };
