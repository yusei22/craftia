import { cloneRawToRasterizedStatic } from 'application/layers/layer-clone/cloneRawToRasterizedStatic';
import { cloneRawToSmartObjectStatic } from 'application/layers/layer-clone/cloneRawToSmartObjectStatic/inidex';
import { cloneToStatic } from 'application/layers/layer-clone/cloneToStatic';
import { MaskingLayer } from '../../layers-body';
import {
  Layer,
  LayerTree,
  MaskedLayer,
  StaticLayerTree,
  StaticRasterizedLayer,
  StaticSmartObjectLayer,
  isMaskedLayer,
  isRasterizedLayer,
  isStaticRasterizedLayer,
  isStaticSmartObjectLayer,
} from 'application/types';
import { Vec2 } from 'application/units';

async function getStaticMaskedLayer(layer: MaskedLayer, createCtx2DFunc: CreateCtx2DFunc, useImageBitmap: boolean) {
  let newOriginal: StaticRasterizedLayer | StaticSmartObjectLayer;
  let newMaskingSource: StaticRasterizedLayer;

  if (isRasterizedLayer(layer.originalLayer)) {
    if (isStaticRasterizedLayer(layer.originalLayer)) {
      newOriginal = layer.originalLayer.shallowCopy();
    } else {
      newOriginal = await cloneRawToRasterizedStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
    }
  } else {
    if (isStaticSmartObjectLayer(layer.originalLayer)) {
      newOriginal = layer.originalLayer.shallowCopy();
    } else {
      newOriginal = await cloneRawToSmartObjectStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
    }
  }

  if (isStaticRasterizedLayer(layer.maskingSource)) {
    newMaskingSource = layer.maskingSource.shallowCopy();
  } else {
    newMaskingSource = await cloneRawToRasterizedStatic(layer.originalLayer, createCtx2DFunc, useImageBitmap);
  }

  return new MaskingLayer(
    createCtx2DFunc(),
    newOriginal,
    newMaskingSource,
    new Vec2(layer.canvas.width, layer.canvas.height)
  );
}

async function getStaticLayer(layer: Layer, createCtx2DFunc: CreateCtx2DFunc, useImageBitmap: boolean) {
  if (isStaticRasterizedLayer(layer) || isStaticSmartObjectLayer(layer)) {
    return layer.shallowCopy();
  } else if (isMaskedLayer(layer)) {
    return getStaticMaskedLayer(layer, createCtx2DFunc, useImageBitmap);
  } else {
    return cloneToStatic(layer, createCtx2DFunc, useImageBitmap);
  }
}

async function createStaticLayerTree(
  layerTree: LayerTree,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticLayerTree> {
  return await Promise.all(
    layerTree.map(async (layerInfo) => {
      return {
        id: layerInfo.id,
        layer: await getStaticLayer(layerInfo.layer, createCtx2DFunc, useImageBitmap),
      };
    })
  );
}

export { createStaticLayerTree };
