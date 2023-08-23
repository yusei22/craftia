import { RasterizedLayer, StaticRasterizedLayer, isRasterizedLayer, isStaticRasterizedLayer } from './RasterizedLayer';
import { SmartObjectLayer, StaticSmartObjectLayer, isStaticSmartObjectLayer } from './SmartObjectLayer';
import { MaskingLayer } from 'application/layers/layers-body/masking/MaskingLayer';

type MaskedLayer = MaskingLayer<RasterizedLayer | SmartObjectLayer, RasterizedLayer>;

type StaticMaskedLayer = MaskingLayer<StaticRasterizedLayer | StaticSmartObjectLayer, StaticRasterizedLayer>;

function isStaticMaskedLayer(value: any): value is StaticMaskedLayer {
  if (isMaskedLayer(value)) {
    if (
      isStaticRasterizedLayer(value.originalLayer) ||
      (isStaticSmartObjectLayer(value.originalLayer) && isStaticRasterizedLayer(value.maskingSource))
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isMaskedLayer(value: any): value is MaskedLayer {
  if (value instanceof MaskingLayer) {
    return true;
  }
  return false;
}
export type { MaskedLayer, StaticMaskedLayer };
export { isMaskedLayer, isStaticMaskedLayer };
