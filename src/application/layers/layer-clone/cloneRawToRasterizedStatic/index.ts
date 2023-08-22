import { rasterizedToRasterizedStatic } from './fromRasterized';
import { smartObjectToRasterizedStatic } from './fromSmartObject';
import { RasterizedLayer, SmartObjectLayer, StaticRasterizedLayer, isSmartObjectLayer } from 'application/types';

async function cloneRawToRasterizedStatic(
  layer: RasterizedLayer | SmartObjectLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticRasterizedLayer> {
  if (isSmartObjectLayer(layer)) {
    return smartObjectToRasterizedStatic(layer, createCtx2DFunc, useImageBitmap);
  } else {
    return rasterizedToRasterizedStatic(layer, createCtx2DFunc, useImageBitmap);
  }
}
export { cloneRawToRasterizedStatic };
