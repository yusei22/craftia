import { Vec2 } from '../../../../units';
import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../../layer-settings/SystemLayerSettings';
import { createRasterizedImgBitmapLayer } from '../../rasterized/RasterizedImgBitmapLayer';
import { createRasterizedImgElementLayer } from '../../rasterized/RasterizedImgElementLayer';
import { WebGL2Layer } from '../WebGL2Layer';

class RasterizedWebGL2Layer extends WebGL2Layer {
  public settings: LayerSettings;
  get systemSettings() {
    return new SystemLayerSettings({
      resize: new Vec2(this.canvas.width, this.canvas.height),
    });
  }
  constructor(fleshGl2: WebGL2RenderingContext, settings: LayerSettings) {
    super(fleshGl2);
    this.settings = settings.clone();
  }
  public viewportCanvas(size: Vec2): void {
    super.viewport(size);
  }
  public createRasterizedImgBitmapLayer() {
    return createRasterizedImgBitmapLayer(this.canvas, this.settings);
  }
  public createRasterizedImgElementLayer() {
    const dataURL = this.canvas.toDataURL();
    return createRasterizedImgElementLayer(dataURL, this.settings);
  }
}
export { RasterizedWebGL2Layer };
