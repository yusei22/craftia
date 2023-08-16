import { decodeLayer } from './decode-layer/decodeLayer';
import { LayerTree, EncodedLayer } from 'application/types';

import { Vec2 } from 'application/units';

function decodeLayerTree(
  encodedLayerTree: EncodedLayer[],
  projectSize: Vec2,
  useImageBitmap: boolean
): Promise<LayerTree> {
  return Promise.all(
    encodedLayerTree.map(async (encodedLayer) => {
      return {
        id: 0,
        layer: await decodeLayer(encodedLayer, projectSize, useImageBitmap),
      };
    })
  );
}
export { decodeLayerTree };
