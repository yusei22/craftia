import { layerSourceToDataURL } from 'application/dataURL/layerSourceToDataURL';
import { createSmartImgBitmapLayer, createSmartImgElementLayer } from 'application/layers/layers-body';
import { RasterizedLayer, StaticSmartObjectLayer } from 'application/types';

function rasterizedToSmartObjectStatic(
  layer: RasterizedLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticSmartObjectLayer> {
  if (useImageBitmap) {
    return createSmartImgBitmapLayer(layer.source, layer.settings, layer.systemSettings.resize);
  } else {
    const source = layerSourceToDataURL(layer, createCtx2DFunc());
    return createSmartImgElementLayer(source, layer.settings, layer.systemSettings.resize);
  }
}
export { rasterizedToSmartObjectStatic };
