import { LayerSettings } from '../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../layer-settings/SystemLayerSettings';
type ILayerImageSource = HTMLCanvasElement | ImageBitmap | HTMLImageElement;
interface ILayer {
  readonly settings: LayerSettings;
  readonly systemSettings: SystemLayerSettings;
  readonly source: ILayerImageSource;
}
export { ILayer };
export type { ILayerImageSource };
