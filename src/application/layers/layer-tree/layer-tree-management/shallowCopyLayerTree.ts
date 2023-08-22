import { LayerTree } from 'application/types';

function shallowCopyLayerTree(layerTree: LayerTree): LayerTree {
  return layerTree.map((value) => {
    return {
      id: value.id,
      layer: value.layer,
    };
  });
}
export { shallowCopyLayerTree };
