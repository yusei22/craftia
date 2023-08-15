import { LayerSettings } from "../../layer-settings/LayerSettings";
import { EncodedLayer,Layer  } from "../../../types";
import { Vec2 } from "../../../units/Vec2";
import { decodeLayerSettings } from "./decodeLayerSettings";
import { dataURLtoRasterizedLayer } from "../../dataURL-manager/dataURLtoRasterizedLayer";
import { dataURLtoSmartLayer } from "../../dataURL-manager/dataURLtoSmartLayer";
import { EmptyLayer } from "../../layers-body/empty/EmptyLayer";
import { MaskingLayer } from "../../layers-body/masking/MaskingLayer";

async function decodeLayer(encodedLayer: EncodedLayer, projectSize: Vec2, useImageBitmap: boolean): Promise<Layer> {
    if (encodedLayer.masking) {
        const maskingSourceLayer = await dataURLtoRasterizedLayer({
            dataurl: encodedLayer.masking.imageData,
            settings: new LayerSettings({
                opacity: encodedLayer.masking.opacity
            }),
            useImageBitmap: useImageBitmap
        })
        const originalLayer = await decodeNotMaskedLayer(encodedLayer, useImageBitmap);
        return new MaskingLayer(originalLayer, maskingSourceLayer, projectSize)
    }
    else {
        return decodeNotMaskedLayer(encodedLayer, useImageBitmap);
    }

}
const decodeNotMaskedLayer = (encodedLayer: EncodedLayer, useImageBitmap: boolean) => {
    const layerSettings = decodeLayerSettings(encodedLayer);
    if (encodedLayer.type === 'rasterized') {
        return dataURLtoRasterizedLayer({
            dataurl: encodedLayer.imageData,
            settings: layerSettings,
            useImageBitmap: useImageBitmap
        })
    }
    if (encodedLayer.type === 'smart-object') {
        return dataURLtoSmartLayer({
            dataurl: encodedLayer.imageData,
            settings: layerSettings,
            resize: new Vec2(encodedLayer.resize),
            useImageBitmap: useImageBitmap
        })
    }
    else {
        return new Promise<EmptyLayer>((resolve) => {
            resolve(new EmptyLayer())
        })
    }
}
export { decodeLayer }
