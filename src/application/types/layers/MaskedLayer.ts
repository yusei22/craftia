import { MaskingLayer } from 'application/layers/layers-body/masking/MaskingLayer';

type MaskedLayer = MaskingLayer;

function isMaskedLayer(value: any): value is MaskingLayer {
  if (value instanceof MaskingLayer) {
    return true;
  }
  return false;
}
export type { MaskedLayer };
export { isMaskedLayer };
