import { layerSourceToDataURL } from 'application/dataURL/layerSourceToDataURL';
import { createSmartImgBitmapLayer, createSmartImgElementLayer } from 'application/layers/layers-body';
import { SmartObjectLayer } from 'application/types';

function smartObjectToSmartObjectStatic(
  layer: SmartObjectLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
) {
  if (useImageBitmap) {
    return createSmartImgBitmapLayer(layer.source, layer.settings, layer.systemSettings.resize);
  } else {
    const source = layerSourceToDataURL(layer, createCtx2DFunc());
    return createSmartImgElementLayer(source, layer.settings, layer.systemSettings.resize);
  }
}
export { smartObjectToSmartObjectStatic };
