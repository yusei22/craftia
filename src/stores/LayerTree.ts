import { LayerTree, StaticLayerTree } from 'application/types';
import { atom } from 'recoil';
import { useLayerTreeUndoRedo } from 'hooks';

const HISTORY_LENGTH = 20;
const useImageBitmap = true;
const defualt: StaticLayerTree = [];

const layerTreeState = atom<LayerTree>({
    key: 'layerTree',
    default: defualt,
});

const layerTreeHistoryState = atom<LayerTree>({
    key: 'layerTreeHistoryState',
    default: defualt,
});

const layerTreeUndoRedo = useLayerTreeUndoRedo({
    key: 'layerTreeUndoRedo ',
    storageLength: HISTORY_LENGTH,
    defualt: defualt,
    useImageBitmap: true,
});
export { layerTreeState, layerTreeUndoRedo, useImageBitmap, layerTreeHistoryState };
