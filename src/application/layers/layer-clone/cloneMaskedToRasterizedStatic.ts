import { MaskingLayer } from '../layers-body';
import { rasterizedToRasterizedStatic } from './cloneRawToRasterizedStatic/fromRasterized';
import { smartObjectToRasterizedStatic } from './cloneRawToRasterizedStatic/fromSmartObject';
import { MaskedLayer, StaticRasterizedLayer, isSmartObjectLayer } from 'application/types';
import { Vec2 } from 'application/units';

async function cloneMaskedToRasterizedStatic(
  layer: MaskedLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<MaskingLayer<StaticRasterizedLayer, StaticRasterizedLayer>> {
  let newOriginalLayer: StaticRasterizedLayer;

  if (isSmartObjectLayer(layer.originalLayer)) {
    newOriginalLayer = await smartObjectToRasterizedStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
  } else {
    newOriginalLayer = await rasterizedToRasterizedStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
  }
  const newMaskingSource = await rasterizedToRasterizedStatic(layer.maskingSource, createCtx2DFunc, useImageBitmap);
  return new MaskingLayer(
    createCtx2DFunc(),
    newOriginalLayer,
    newMaskingSource,
    new Vec2(layer.canvas.width, layer.canvas.height)
  );
}
export { cloneMaskedToRasterizedStatic };
