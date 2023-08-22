import { LayerDataURLEncoder } from '../encode-helper/LayerDataURLEncoder';
import { encodeLayerBody } from './encodeLayerBody';
import { encodeLayerSettings } from './encodeLayerSettings';
import { EncodedLayer, Layer } from 'application/types';

const encodeLayer = (layer: Layer, base64Exporter: LayerDataURLEncoder): EncodedLayer => {
  const exportedLayerBody = encodeLayerBody(layer, base64Exporter);
  const exportedLayerSettings = encodeLayerSettings(layer.settings);

  return Object.assign(exportedLayerBody, exportedLayerSettings);
};

export { encodeLayer };
