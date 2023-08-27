import { useLayerDataURLEncoder } from '../dataurl/useDataURLEncoder';
import { createRasterizedImgBitmapLayer, createRasterizedImgElementLayer } from 'application/layers/layers-body';
import { RasterizedLayer } from 'application/types';

function useRasterizedLayerClone() {
  const dataURLEncoder = useLayerDataURLEncoder();

  return (layer: RasterizedLayer, useImageBitmap: boolean) => {
    if (dataURLEncoder === null) throw Error();
    if (useImageBitmap) {
      return createRasterizedImgBitmapLayer(layer.source, layer.settings);
    } else {
      const source = dataURLEncoder.encode(layer.source);
      return createRasterizedImgElementLayer(source, layer.settings);
    }
  };
}
export { useRasterizedLayerClone };
