import { dataURLtoRasterizedLayer } from '../../../../dataURL/dataURLtoRasterizedLayer';
import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { MaskingLayer } from '../../../layers-body';
import { decodeLayerSettings } from './decodeLayerSettings';
import { dataURLtoSmartLayer } from 'application/dataURL/dataURLtoSmartLayer';
import { EncodedLayer, Layer } from 'application/types';
import { Vec2 } from 'application/units';

async function decodeLayer(
  createCtx2DFunc: CreateCtx2DFunc,
  encodedLayer: EncodedLayer,
  projectSize: Vec2,
  useImageBitmap: boolean
): Promise<Layer> {
  if (encodedLayer.masking) {
    const maskingSourceLayer = await dataURLtoRasterizedLayer({
      dataurl: encodedLayer.masking.imageData,
      settings: new LayerSettings({
        opacity: encodedLayer.masking.opacity,
      }),
      useImageBitmap: useImageBitmap,
    });

    const originalLayer = await decodeNotMaskedLayer(encodedLayer, useImageBitmap);

    return new MaskingLayer(createCtx2DFunc(), originalLayer, maskingSourceLayer, projectSize);
  } else {
    return decodeNotMaskedLayer(encodedLayer, useImageBitmap);
  }
}

const decodeNotMaskedLayer = (encodedLayer: EncodedLayer, useImageBitmap: boolean) => {
  const layerSettings = decodeLayerSettings(encodedLayer);

  if (encodedLayer.type === 'rasterized') {
    return dataURLtoRasterizedLayer({
      dataurl: encodedLayer.imageData,
      settings: layerSettings,
      useImageBitmap: useImageBitmap,
    });
  } else {
    return dataURLtoSmartLayer({
      dataurl: encodedLayer.imageData,
      settings: layerSettings,
      resize: new Vec2(encodedLayer.resize),
      useImageBitmap: useImageBitmap,
    });
  }
};
export { decodeLayer };
