import { LayerTree } from 'application/types';

function getLayerIndexFromID(layertree: LayerTree, uuid: string) {
  for (let i = 0; i < layertree.length; i++) {
    if (layertree[i].id === uuid) return i;
  }
  return null;
}
function getLayerIndexFromName(layertree: LayerTree, name: string) {
  for (let i = 0; i < layertree.length; i++) {
    if (layertree[i].layer.settings.name === name) return i;
  }
  return null;
}
export { getLayerIndexFromID, getLayerIndexFromName };
