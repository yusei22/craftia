import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import {
  CompositeLayer,
  RasterizedBufferLayer,
  RasterizedCtx2DLayer,
  RasterizedImgElementLayer,
  RasterizedWebGL2Layer,
  SmartCtx2DLayer,
  SmartImgElementLayer,
  SmartWebGL2Layer,
} from 'application/layers/layers-body';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';

function layerSourceToDataURL(layer: Layer, context: CanvasRenderingContext2D) {
  if (layer instanceof SmartImgElementLayer || layer instanceof RasterizedImgElementLayer) {
    return layer.source.src;
  }
  if (
    layer instanceof RasterizedCtx2DLayer ||
    layer instanceof RasterizedWebGL2Layer ||
    layer instanceof RasterizedBufferLayer ||
    layer instanceof CompositeLayer ||
    layer instanceof SmartCtx2DLayer ||
    layer instanceof SmartWebGL2Layer
  ) {
    return layer.source.toDataURL();
  }

  const renderer = new ImageRenderer(context);
  const size = new Vec2(layer.source.width, layer.source.height);
  renderer.viewport(size);
  renderer.drawImage(layer.source, new Vec2(0, 0), size);
  return renderer.canvas.toDataURL();
}
export { layerSourceToDataURL };
