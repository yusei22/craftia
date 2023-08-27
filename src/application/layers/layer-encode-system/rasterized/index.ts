import { EncodedLayerBody, RasterizedLayer } from 'application/types';

export function encodeRasterizedBody(layer: RasterizedLayer, dataURL: string): EncodedLayerBody {
  return {
    imageData: dataURL,
    type: 'rasterized',
    masking: null,
    resize: [layer.systemSettings.resize.x, layer.systemSettings.resize.y],
  };
}
