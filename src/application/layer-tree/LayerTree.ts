import { ILayer } from 'application/layers/Ilayer';

export type LayerInfo = {
    id: string;
    layer: ILayer;
};
export type LayerTree = LayerInfo[];
