import { Layer } from './Layer';
import { StaticMaskedLayer } from './MaskedLayer';
import { StaticRasterizedLayer } from './RasterizedLayer';
import { StaticSmartObjectLayer } from './SmartObjectLayer';

type LayerInfo = {
  id: string;
  layer: Layer;
};

type LayerTree = LayerInfo[];

type StaticLayerInfo = {
  id: string;
  layer: StaticRasterizedLayer | StaticSmartObjectLayer | StaticMaskedLayer;
};

type StaticLayerTree = StaticLayerInfo[];

export type { LayerTree, LayerInfo, StaticLayerTree, StaticLayerInfo };
