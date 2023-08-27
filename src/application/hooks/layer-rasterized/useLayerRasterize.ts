import { useContext2D } from '../canvas/useContext2D';
import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import { createRasterizedImgBitmapLayer, createRasterizedImgElementLayer } from 'application/layers/layers-body';
import { SmartObjectLayer } from 'application/types';
import { Vec2 } from 'application/units';

function useLayerRasterize() {
  const { contextRef } = useContext2D();

  return (layer: SmartObjectLayer, useImageBitmap: boolean) => {
    if (contextRef.current === null) {
      throw Error('"Failed to get canvasContext2D.This function should be called after DOM rendering');
    }

    const renderer = new ImageRenderer(contextRef.current);

    renderer.viewport(layer.systemSettings.resize);
    renderer.drawImage(layer.source, new Vec2(0, 0), layer.systemSettings.resize);

    if (useImageBitmap) {
      return createRasterizedImgBitmapLayer(renderer.canvas, layer.settings);
    } else {
      return createRasterizedImgElementLayer(renderer.canvas.toDataURL(), layer.settings);
    }
  };
}
export { useLayerRasterize };
