import { LayerSettings } from '../layers/layer-settings/LayerSettings';
import { RasterizedImgBitmapLayer, RasterizedImgElementLayer } from '../layers/layers-body';
import { dataurlToImageBitmap, dataurlToImageElement } from './decodeDataurl';
type DataURLtoRasterizedLayerParam = {
  dataurl: string;
  settings: LayerSettings;
  useImageBitmap: boolean;
};
const dataURLtoRasterizedLayer = async ({
  dataurl,
  settings: layerSettings,
  useImageBitmap,
}: DataURLtoRasterizedLayerParam) => {
  if (useImageBitmap) {
    let imageBitmap: ImageBitmap;

    try {
      imageBitmap = await dataurlToImageBitmap(dataurl);
    } catch (e) {
      throw Error('Failed to create RasterizedImgBitmapLayer ');
    }

    return new RasterizedImgBitmapLayer(imageBitmap, layerSettings);
  } else {
    let imageElement: HTMLImageElement;

    try {
      imageElement = await dataurlToImageElement(dataurl);
    } catch (e) {
      throw Error('Failed to create RasterizedImgElementLayer');
    }

    return new RasterizedImgElementLayer(imageElement, layerSettings);
  }
};
export { dataURLtoRasterizedLayer };
