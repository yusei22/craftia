import { MaskedLayer, isMaskedLayer } from './MaskedLayer';
import { RasterizedLayer, isRasterizedLayer } from './RasterizedLayer';
import { SmartObjectLayer, isSmartObjectLayer } from './SmartObjectLayer';

type Layer = MaskedLayer | RasterizedLayer | SmartObjectLayer;

function isLayer(value: any): value is Layer {
  if (isMaskedLayer(value) || isRasterizedLayer(value) || isSmartObjectLayer(value)) {
    return true;
  }
  return false;
}
export type { Layer };
export { isLayer };
