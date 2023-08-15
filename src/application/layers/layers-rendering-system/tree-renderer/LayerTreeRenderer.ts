import { Vec2 } from "application/units";
import { LayerRenderer } from "../renderer/LayerRenderer";
import { LayersCache, LayersRange } from "./LayersCache";
import { LayerTree } from "application/types/layers/LayerTree";
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
export { LayerTreeRenderer }