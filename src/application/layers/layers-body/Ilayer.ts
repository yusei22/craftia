import { LayerSettings, LayerSettingsParam } from '../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../layer-settings/SystemLayerSettings';
import { Layer } from 'application/types';
type ILayerImageSource = HTMLCanvasElement | ImageBitmap | HTMLImageElement;
interface ILayer {
  settings: LayerSettings;
  readonly systemSettings: SystemLayerSettings;
  readonly source: ILayerImageSource;
  editSettings(editItem: Partial<LayerSettingsParam>): Layer;
}
export type { ILayer, ILayerImageSource };
