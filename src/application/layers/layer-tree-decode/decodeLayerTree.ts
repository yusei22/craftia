import { LayerTree } from "../layers-rendering-system/tree-renderer/LayerTreeRenderer";
import { EncodedLayer } from "../../types";
import { decodeLayer } from "./decode-layer/decodeLayer";
import { Vec2 } from "../../units";

function decodeLayerTree(encodedLayerTree: EncodedLayer[], projectSize: Vec2, useImageBitmap: boolean): Promise<LayerTree> {
    return Promise.all(
        encodedLayerTree.map(
            async (encodedLayer) => {
                return {
                    id: 0,
                    layer: await decodeLayer(encodedLayer, projectSize, useImageBitmap)
                }
            }))
}
export { decodeLayerTree }