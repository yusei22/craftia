import { LayerBase64Encoder } from '../encode-helper/LayerBase64Encoder';
import { encodeLayerBody } from './encodeLayerBody';
import { encodeLayerSettings } from './encodeLayerSettings';
import { EncodedLayer, Layer } from 'application/types';
const encodeLayer = (layer: Layer, base64Exporter: LayerBase64Encoder): EncodedLayer => {
  const exportedLayerBody = encodeLayerBody(layer, base64Exporter);
  const exportedLayerSettings = encodeLayerSettings(layer.settings);

  return Object.assign(exportedLayerBody, exportedLayerSettings);
};
export { encodeLayer };
