import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { ILayer } from '../Ilayer';
import { Vec2 } from 'application/units';

class SmartImgBitmapLayer implements ILayer {
  readonly source: ImageBitmap;
  public settings: LayerSettings;
  public get systemSettings() {
    return this._systemSettings;
  }
  private _systemSettings: SystemLayerSettings;
  constructor(source: ImageBitmap, settings: LayerSettings, resize: Vec2) {
    this.source = source;
    this.settings = settings.clone();
    this._systemSettings = new SystemLayerSettings({ resize: resize.clone() });
  }
  public cloneAsync(): Promise<SmartImgBitmapLayer> {
    return createSmartImgBitmapLayer(this.source, this.settings, this._systemSettings.resize);
  }
  public changeResizeSettings(newSize: Vec2) {
    this._systemSettings = this._systemSettings.cloneEdit({ resize: newSize });
  }
  public destroy(): void {
    this.source.close();
  }
  public shallowCopy() {
    return new SmartImgBitmapLayer(this.source, this.settings, this._systemSettings.resize);
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
async function createSmartImgBitmapLayer(
  source: ImageBitmapSource,
  layerSettings: LayerSettings,
  resize: Vec2
): Promise<SmartImgBitmapLayer> {
  let imageBitmap: ImageBitmap;
  try {
    imageBitmap = await createImageBitmap(source);
  } catch (e) {
    throw Error('Failed to create SmartImgBitmapLayer ');
  }
  return new SmartImgBitmapLayer(imageBitmap, layerSettings, resize);
}
export { SmartImgBitmapLayer, createSmartImgBitmapLayer };
