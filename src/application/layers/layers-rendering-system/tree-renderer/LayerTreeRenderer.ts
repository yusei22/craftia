import { Layer } from "../../../types"
import { Vec2 } from "../../../units";
import { LayerRenderer } from "../renderer/LayerRenderer";
import { LayersCache, LayersRange } from "./LayersCache";
type LayerTree = {
    id: number,
    layer: Layer
}[]
class LayerTreeRenderer {
    private cache: LayersCache;
    private layerRenderer: LayerRenderer;
    public get result() {
        return this.layerRenderer.canvas
    }
    constructor(size: Vec2) {
        this.cache = new LayersCache(size);
        this.layerRenderer = new LayerRenderer(size);
    }
    render(layerTree: LayerTree, changedRange?: LayersRange) {
        this.cache.changeLayers(
            layerTree.map(value => value.layer),
            changedRange
        );
        this.layerRenderer.redraw(this.cache.layersAfterOptimization);
    }
}
export type { LayerTree }
export { LayerTreeRenderer }