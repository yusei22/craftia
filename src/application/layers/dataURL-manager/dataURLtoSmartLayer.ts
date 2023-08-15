import { dataurlToImageBitmap, dataurlToImageElement } from "./decodeDataurl";
import { LayerSettings } from "../layer-settings/LayerSettings";
import { SmartImgBitmapLayer, SmartImgElementLayer } from "../layers-body";
import { Vec2 } from "application/units";
type dataURLtoSmartLayerParam = {
    dataurl: string,
    settings: LayerSettings,
    resize: Vec2,
    useImageBitmap: boolean
}

const dataURLtoSmartLayer = async ({ dataurl, settings: layerSettings, resize, useImageBitmap }: dataURLtoSmartLayerParam) => {
    const _resize = new Vec2(Math.max(1, resize.x), Math.max(1, resize.y))
    if (useImageBitmap) {
        let imageBitmap: ImageBitmap;
        try {
            imageBitmap = await dataurlToImageBitmap(dataurl)
        } catch (e) {
            throw Error("Failed to create SmartImgElementLaye ");
        }
        return new SmartImgBitmapLayer(imageBitmap, layerSettings, _resize)
    }
    else {
        let imageElement: HTMLImageElement;
        try {
            imageElement = await dataurlToImageElement(dataurl);
        } catch (e) {
            throw Error("Failed to create SmartImgElementLaye");
        }
        return new SmartImgElementLayer(imageElement, layerSettings, _resize);
    }
}
export { dataURLtoSmartLayer }