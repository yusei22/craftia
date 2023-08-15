import { LayerTree } from "../layers-rendering-system/tree-renderer/LayerTreeRenderer";
import { LayerBase64Encoder } from "./encode-helper/LayerBase64Encoder";
import { encodeLayer } from "./encode-layer/encodeLayer";

function encodeLayerTree(layerTree: LayerTree) {
    const base64Exporter = new LayerBase64Encoder()
    return layerTree.map(value =>
        encodeLayer(value.layer, base64Exporter)
    )
}
export { encodeLayerTree }