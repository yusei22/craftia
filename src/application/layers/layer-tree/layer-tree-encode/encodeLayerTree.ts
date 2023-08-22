import { LayerDataURLEncoder } from './encode-helper/LayerDataURLEncoder';
import { encodeLayer } from './encode-layer/encodeLayer';
import { LayerTree } from 'application/types';

function encodeLayerTree(layerTree: LayerTree, createCtx2DFunc: CreateCtx2DFunc) {
  const base64Exporter = new LayerDataURLEncoder(createCtx2DFunc());
  return layerTree.map((value) => encodeLayer(value.layer, base64Exporter));
}

export { encodeLayerTree };
