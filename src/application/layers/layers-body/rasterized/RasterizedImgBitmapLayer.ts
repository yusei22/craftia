import { LayerSettings } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { ILayer } from '../Ilayer';
import { Vec2 } from 'application/units';
class RasterizedImgBitmapLayer implements ILayer {
  readonly source: ImageBitmap;
  public settings: LayerSettings;
  public get systemSettings() {
    return this._systemSettings;
  }
  private _systemSettings: SystemLayerSettings;
  constructor(source: ImageBitmap, settings: LayerSettings) {
    this.source = source;
    this.settings = settings.clone();
    this._systemSettings = new SystemLayerSettings({
      resize: new Vec2(source.width, source.height),
    });
  }
  public cloneAsync(): Promise<RasterizedImgBitmapLayer> {
    return createRasterizedImgBitmapLayer(this.source, this.settings);
  }
  public destroy(): void {
    this.source.close();
  }
}
async function createRasterizedImgBitmapLayer(
  source: ImageBitmapSource,
  layerSettings: LayerSettings
): Promise<RasterizedImgBitmapLayer> {
  let imageBitmap: ImageBitmap;
  try {
    imageBitmap = await createImageBitmap(source);
  } catch (e) {
    throw Error('Failed to create RasterizedImgBitmapLayer ');
  }
  return new RasterizedImgBitmapLayer(imageBitmap, layerSettings);
}
export { RasterizedImgBitmapLayer, createRasterizedImgBitmapLayer };
