import { MaskingLayer } from '../layers-body';
import { rasterizedToRasterizedStatic } from './cloneRawToRasterizedStatic/fromRasterized';
import { rasterizedToSmartObjectStatic } from './cloneRawToSmartObjectStatic/fromRasterized';
import { smartObjectToSmartObjectStatic } from './cloneRawToSmartObjectStatic/fromSmartObject';
import { MaskedLayer, StaticSmartObjectLayer, isRasterizedLayer, StaticRasterizedLayer } from 'application/types';
import { Vec2 } from 'application/units';

async function cloneMaskedToSmartObjectStatic(
  layer: MaskedLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<MaskingLayer<StaticSmartObjectLayer, StaticRasterizedLayer>> {
  let newOriginalLayer: StaticSmartObjectLayer;

  if (isRasterizedLayer(layer.originalLayer)) {
    newOriginalLayer = await rasterizedToSmartObjectStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
  } else {
    newOriginalLayer = await smartObjectToSmartObjectStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
  }

  const newMaskingSource = await rasterizedToRasterizedStatic(layer.maskingSource, createCtx2DFunc, useImageBitmap);
  return new MaskingLayer(
    createCtx2DFunc(),
    newOriginalLayer,
    newMaskingSource,
    new Vec2(layer.canvas.width, layer.canvas.height)
  );
}

export { cloneMaskedToSmartObjectStatic };
