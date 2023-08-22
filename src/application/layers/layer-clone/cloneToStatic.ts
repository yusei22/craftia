import { MaskingLayer } from '../layers-body';
import { cloneMaskedToRasterizedStatic } from './cloneMaskedToRasterizedStatic';
import { cloneMaskedToSmartObjectStatic } from './cloneMaskedToSmartObjectStatic';
import { cloneRawToRasterizedStatic } from './cloneRawToRasterizedStatic';
import { cloneRawToSmartObjectStatic } from './cloneRawToSmartObjectStatic/inidex';
import {
  Layer,
  StaticRasterizedLayer,
  StaticSmartObjectLayer,
  isMaskedLayer,
  isSmartObjectLayer,
} from 'application/types';

function cloneToStatic(
  layer: Layer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<
  | MaskingLayer<StaticRasterizedLayer | StaticSmartObjectLayer, StaticRasterizedLayer>
  | StaticSmartObjectLayer
  | StaticRasterizedLayer
> {
  if (isMaskedLayer(layer)) {
    if (isSmartObjectLayer(layer.originalLayer)) {
      return cloneMaskedToSmartObjectStatic(layer, createCtx2DFunc, useImageBitmap);
    } else {
      return cloneMaskedToRasterizedStatic(layer, createCtx2DFunc, useImageBitmap);
    }
  } else if (isSmartObjectLayer(layer)) {
    return cloneRawToSmartObjectStatic(layer, createCtx2DFunc, useImageBitmap);
  } else {
    return cloneRawToRasterizedStatic(layer, createCtx2DFunc, useImageBitmap);
  }
}

export { cloneToStatic };
