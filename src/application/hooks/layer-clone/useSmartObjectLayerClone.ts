import { useLayerDataURLEncoder } from '../dataurl/useDataURLEncoder';
import { createSmartImgBitmapLayer, createSmartImgElementLayer } from 'application/layers/layers-body';
import { SmartObjectLayer } from 'application/types';

function useSmartObjectLayerClone() {
  const dataURLEncoder = useLayerDataURLEncoder();
  return (layer: SmartObjectLayer, useImageBitmap: boolean) => {
    if (dataURLEncoder === null) throw Error();
    if (useImageBitmap) {
      return createSmartImgBitmapLayer(layer.source, layer.settings, layer.systemSettings.resize);
    } else {
      const source = dataURLEncoder.encode(layer.source);
      return createSmartImgElementLayer(source, layer.settings, layer.systemSettings.resize);
    }
  };
}
export { useSmartObjectLayerClone };
