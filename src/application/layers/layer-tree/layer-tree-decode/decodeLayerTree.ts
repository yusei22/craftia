import { decodeLayer } from './decode-layer/decodeLayer';
import { LayerTree, EncodedLayer } from 'application/types';
import { Vec2 } from 'application/units';

function decodeLayerTree(
  createCtx2DFunc: CreateCtx2DFunc,
  encodedLayerTree: EncodedLayer[],
  projectSize: Vec2,
  useImageBitmap: boolean
): Promise<LayerTree> {
  return Promise.all(
    encodedLayerTree.map(async (encodedLayer) => {
      return {
        id: crypto.randomUUID(),
        layer: await decodeLayer(createCtx2DFunc, encodedLayer, projectSize, useImageBitmap),
      };
    })
  );
}
export { decodeLayerTree };
