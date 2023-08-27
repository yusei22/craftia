import { EncodedLayerBody, SmartObjectLayer } from 'application/types';

export function encodeSmartObjectBody(layer: SmartObjectLayer, dataURL: string): EncodedLayerBody {
  return {
    imageData: dataURL,
    type: 'smart-object',
    masking: null,
    resize: [layer.systemSettings.resize.x, layer.systemSettings.resize.y],
  };
}
