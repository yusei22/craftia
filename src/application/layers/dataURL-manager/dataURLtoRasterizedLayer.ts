import { dataurlToImageBitmap, dataurlToImageElement } from "./decodeDataurl";
import { LayerSettings } from "../layer-settings/LayerSettings";
import { RasterizedImgBitmapLayer } from "../layers-body/rasterized/RasterizedImgBitmapLayer";
import { RasterizedImgElementLayer } from "../layers-body/rasterized/RasterizedImgElementLayer";
type DataURLtoRasterizedLayerParam = {
    dataurl: string,
    settings: LayerSettings,
    useImageBitmap: boolean
}

const dataURLtoRasterizedLayer = async ({ dataurl, settings: layerSettings, useImageBitmap }: DataURLtoRasterizedLayerParam) => {
    if (useImageBitmap) {
        let imageBitmap: ImageBitmap;
        try {
            imageBitmap = await dataurlToImageBitmap(dataurl)
        } catch (e) {
            throw Error("Failed to create RasterizedImgBitmapLayer ");
        }
        return new RasterizedImgBitmapLayer(imageBitmap, layerSettings)
    }
    else {
        let imageElement: HTMLImageElement;
        try {
            imageElement = await dataurlToImageElement(dataurl);
        } catch (e) {
            throw Error("Failed to create RasterizedImgElementLayer");
        }
        return new RasterizedImgElementLayer(imageElement, layerSettings)
    }
}
export { dataURLtoRasterizedLayer}