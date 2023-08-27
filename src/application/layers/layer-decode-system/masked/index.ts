import { decodeUndressedLayer } from '../undressed';
import { createContext2D } from 'application/canvas/createContext2D';
import { LayerSettings } from 'application/layers/layer-settings/LayerSettings';
import { MaskingLayer, RasterizedImgBitmapLayer, RasterizedImgElementLayer } from 'application/layers/layers-body';
import { EncodedLayer, StaticMaskedLayer } from 'application/types';
import { Vec2 } from 'application/units';

function decodeMaskedLayer(
  encodedLayer: EncodedLayer,
  originalSource: ImageBitmap | HTMLImageElement,
  maskingSource: ImageBitmap | HTMLImageElement,
  projectSize: Vec2
): StaticMaskedLayer {
  const context = createContext2D().context;
  const originalLayer = decodeUndressedLayer(encodedLayer, originalSource);

  const maskingSourceLayer =
    maskingSource instanceof ImageBitmap
      ? new RasterizedImgBitmapLayer(maskingSource, new LayerSettings())
      : new RasterizedImgElementLayer(maskingSource, new LayerSettings());

  const maskingLayer = new MaskingLayer(context, originalLayer, maskingSourceLayer, projectSize);

  if (encodedLayer.masking?.opacity) maskingLayer.maskOpacity = encodedLayer.masking.opacity;

  return maskingLayer;
}
export { decodeMaskedLayer };
