import { createRasterizedImgBitmapLayer, createRasterizedImgElementLayer } from '../../layers-body';
import { layerSourceToDataURL } from 'application/dataURL/layerSourceToDataURL';
import { RasterizedLayer, StaticRasterizedLayer } from 'application/types';

function rasterizedToRasterizedStatic(
  layer: RasterizedLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticRasterizedLayer> {
  if (useImageBitmap) {
    return createRasterizedImgBitmapLayer(layer.source, layer.settings);
  } else {
    const dataURL = layerSourceToDataURL(layer, createCtx2DFunc());
    return createRasterizedImgElementLayer(dataURL, layer.settings);
  }
}
export { rasterizedToRasterizedStatic };
