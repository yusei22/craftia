import { encodeRasterizedBody } from '../rasterized';
import { encodeSmartObjectBody } from '../smart-object';
import { EncodedLayerBody, MaskedLayer, isSmartObjectLayer } from 'application/types';

export function encodeMaskedBody(
  layer: MaskedLayer,
  originalDataURL: string,
  maskingSourceDataURL: string
): EncodedLayerBody {
  const originalLayerBody = isSmartObjectLayer(layer.originalLayer)
    ? encodeSmartObjectBody(layer.originalLayer, originalDataURL)
    : encodeRasterizedBody(layer.originalLayer, originalDataURL);
  originalLayerBody.masking = {
    imageData: maskingSourceDataURL,
    opacity: layer.maskOpacity,
  };
  return originalLayerBody;
}
