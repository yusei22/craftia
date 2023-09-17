import { LayerRenderer } from './LayerRenderer';
import { Vec2 } from 'application/core/units';

class LayerTreeRenderer {
    private layerRenderer: LayerRenderer;
    constructor(size: Vec2) {
        this.layerRenderer = new LayerRenderer(size);
    }
}
