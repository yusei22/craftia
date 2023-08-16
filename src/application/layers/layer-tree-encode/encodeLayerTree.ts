import { LayerBase64Encoder } from './encode-helper/LayerBase64Encoder';
import { encodeLayer } from './encode-layer/encodeLayer';
import { LayerTree } from 'application/types';

function encodeLayerTree(layerTree: LayerTree) {
  const base64Exporter = new LayerBase64Encoder();

  return layerTree.map((value) => encodeLayer(value.layer, base64Exporter));
}
export { encodeLayerTree };
