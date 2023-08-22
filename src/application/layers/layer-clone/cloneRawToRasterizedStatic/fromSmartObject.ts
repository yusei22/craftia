import { createRasterizedImgBitmapLayer, createRasterizedImgElementLayer } from '../../layers-body';
import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import { SmartObjectLayer, StaticRasterizedLayer } from 'application/types';
import { Vec2 } from 'application/units';

function rasterizeSmartObjectToCanvas(layer: SmartObjectLayer, fleshContext: CanvasRenderingContext2D) {
  const renderer = new ImageRenderer(fleshContext);
  renderer.viewport(layer.systemSettings.resize);
  renderer.drawImage(layer.source, new Vec2(0, 0), layer.systemSettings.resize);
  return renderer.canvas;
}

function smartObjectToRasterizedStatic(
  layer: SmartObjectLayer,
  createCtx2DFunc: CreateCtx2DFunc,
  useImageBitmap: boolean
): Promise<StaticRasterizedLayer> {
  if (useImageBitmap) {
    const source = rasterizeSmartObjectToCanvas(layer, createCtx2DFunc());
    return createRasterizedImgBitmapLayer(source, layer.settings);
  } else {
    const dataURL = rasterizeSmartObjectToCanvas(layer, createCtx2DFunc()).toDataURL();
    return createRasterizedImgElementLayer(dataURL, layer.settings);
  }
}
export { smartObjectToRasterizedStatic };
