import { LayerSettings } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { ILayer } from '../Ilayer';
import { createImageElement } from 'application/image-utils/createImageElement';
import { Vec2 } from 'application/units';
class RasterizedImgElementLayer implements ILayer {
  readonly source: HTMLImageElement;
  public settings: LayerSettings;
  public get systemSettings() {
    return this._systemSettings;
  }
  private _systemSettings: SystemLayerSettings;
  constructor(source: HTMLImageElement, settings: LayerSettings) {
    this.source = source;
    this.settings = settings.clone();
    this._systemSettings = new SystemLayerSettings({
      resize: new Vec2(source.width, source.height),
    });
  }
  public cloneAsync(): Promise<RasterizedImgElementLayer> {
    return createRasterizedImgElementLayer(this.source.src, this.settings);
  }
}
async function createRasterizedImgElementLayer(
  src: string,
  layerSettings: LayerSettings
): Promise<RasterizedImgElementLayer> {
  let imageElement: HTMLImageElement;
  try {
    imageElement = await createImageElement(src);
  } catch (e) {
    throw Error('Failed to create rasterizedImgElementLayer');
  }
  return new RasterizedImgElementLayer(imageElement, layerSettings);
}
export { RasterizedImgElementLayer, createRasterizedImgElementLayer };
