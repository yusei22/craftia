import { LayerTree } from 'application/types';

function getLayerFromID(layertree: LayerTree, uuid: string) {
  for (let i = 0; i < layertree.length; i++) {
    if (layertree[i].id === uuid) return layertree[i];
  }
  return null;
}
function getLayerFromName(layertree: LayerTree, name: string) {
  for (let i = 0; i < layertree.length; i++) {
    if (layertree[i].layer.settings.name === name) return layertree[i];
  }
  return null;
}

export { getLayerFromID, getLayerFromName };
