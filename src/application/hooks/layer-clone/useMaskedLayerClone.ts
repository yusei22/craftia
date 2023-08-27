import { useCreateContext2D } from '../canvas/useCreateContext2D';
import { useRasterizedLayerClone } from './useRasterizedLayerClone';
import { useSmartObjectLayerClone } from './useSmartObjectLayerClone';
import { MaskingLayer } from 'application/layers/layers-body';
import { MaskedLayer, RasterizedLayer, SmartObjectLayer, isRasterizedLayer } from 'application/types';
import { Vec2 } from 'application/units';

function useMaskedLayerClone() {
  const cloneRasterizedLayer = useRasterizedLayerClone();
  const cloneSmartObjectLayer = useSmartObjectLayerClone();
  const createContext2D = useCreateContext2D();

  return async (layer: MaskedLayer, useImageBitmap: boolean) => {
    let newOriginalLayer: SmartObjectLayer | RasterizedLayer;
    let newMaskingSource: RasterizedLayer;

    if (isRasterizedLayer(layer.originalLayer)) {
      newOriginalLayer = await cloneRasterizedLayer(layer.originalLayer, useImageBitmap);
    } else {
      newOriginalLayer = await cloneSmartObjectLayer(layer.originalLayer, useImageBitmap);
    }
    newMaskingSource = await cloneRasterizedLayer(layer.maskingSource, useImageBitmap);

    return new MaskingLayer(
      createContext2D(),
      newOriginalLayer,
      newMaskingSource,
      new Vec2(layer.canvas.width, layer.canvas.height)
    );
  };
}
export { useMaskedLayerClone };
