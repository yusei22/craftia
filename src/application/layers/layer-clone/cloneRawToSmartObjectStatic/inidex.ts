import { rasterizedToSmartObjectStatic } from './fromRasterized';
import { smartObjectToSmartObjectStatic } from './fromSmartObject';
import { StaticSmartObjectLayer, isRasterizedLayer, RasterizedLayer, SmartObjectLayer } from 'application/types';

async function cloneRawToSmartObjectStatic(
  layer: RasterizedLayer | SmartObjectLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticSmartObjectLayer> {
  if (isRasterizedLayer(layer)) {
    return rasterizedToSmartObjectStatic(layer, createCtx2DFunc, useImageBitmap);
  } else {
    return smartObjectToSmartObjectStatic(layer, createCtx2DFunc, useImageBitmap);
  }
}
export { cloneRawToSmartObjectStatic };
