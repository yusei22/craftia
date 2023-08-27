import { decodeLayerSettings } from '../layer-settings';
import {
  SmartImgBitmapLayer,
  SmartImgElementLayer,
  RasterizedImgBitmapLayer,
  RasterizedImgElementLayer,
} from 'application/layers/layers-body';

import { EncodedLayer } from 'application/types';
import { Vec2 } from 'application/units';

function decodeUndressedLayer(encodedLayer: EncodedLayer, source: ImageBitmap | HTMLImageElement) {
  const layerSettings = decodeLayerSettings(encodedLayer);

  if (encodedLayer.type === 'rasterized') {
    if (source instanceof ImageBitmap) {
      return new RasterizedImgBitmapLayer(source, layerSettings);
    } else {
      return new RasterizedImgElementLayer(source, layerSettings);
    }
  } else {
    const resize = new Vec2(encodedLayer.resize);

    if (source instanceof ImageBitmap) {
      return new SmartImgBitmapLayer(source, layerSettings, resize);
    } else {
      return new SmartImgElementLayer(source, layerSettings, resize);
    }
  }
}
export { decodeUndressedLayer };
