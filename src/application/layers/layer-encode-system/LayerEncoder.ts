import { encodeLayerSettings } from './layer-settings';
import { encodeMaskedBody } from './masked';
import { encodeRasterizedBody } from './rasterized';
import { encodeSmartObjectBody } from './smart-object';
import { DataURLEncoder } from 'application/data-url/encode-system/DataURLEncoder';
import { EncodedLayer, Layer, isMaskedLayer, isRasterizedLayer } from 'application/types';

class LayerEncoder {
  readonly dataURLEncoder: DataURLEncoder;

  constructor(dataURLEncoder: DataURLEncoder) {
    this.dataURLEncoder = dataURLEncoder;
  }
  public encode(layer: Layer): EncodedLayer {
    const encodedLayerSettings = encodeLayerSettings(layer.settings);
    if (isMaskedLayer(layer)) {
      const originalDataURL = this.dataURLEncoder.encode(layer.originalLayer.source);
      const maskingDataURL = this.dataURLEncoder.encode(layer.maskingSource.source);
      const layerBody = encodeMaskedBody(layer, originalDataURL, maskingDataURL);

      return Object.assign(layerBody, encodedLayerSettings);
    } else if (isRasterizedLayer(layer)) {
      const dataURL = this.dataURLEncoder.encode(layer.source);
      const layerBody = encodeRasterizedBody(layer, dataURL);

      return Object.assign(layerBody, encodedLayerSettings);
    } else {
      const dataURL = this.dataURLEncoder.encode(layer.source);
      const layerBody = encodeSmartObjectBody(layer, dataURL);

      return Object.assign(layerBody, encodedLayerSettings);
    }
  }
}
export { LayerEncoder };
