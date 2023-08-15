import { Layer } from "../../../types"
import { CompositeLayer } from "../../layers-body/composite/CompositeLayer";
import { Vec2 } from "../../../units";
import { LayerSettings } from "../../layer-settings/LayerSettings";
type LayersRange = {
    start: number,
    end: number,
}
class LayersCache {
    private layers: Layer[] = [];
    private composite: CompositeLayer;
    private cashRangeEndPoint: number;
    constructor(size: Vec2) {
        this.composite = new CompositeLayer(new LayerSettings(), size);
        this.cashRangeEndPoint = 0;
    }
    public get layersAfterOptimization(): Layer[] {
        const notCachedLayers = this.layers.slice(this.cashRangeEndPoint, this.layers.length)
        return [this.composite, ...notCachedLayers];
    }
    public changeLayers(newLayers: Layer[], differnce?: LayersRange) {
        this.layers = newLayers;
        this.setFocusRange(differnce ?? { start: this.layers.length, end: this.layers.length });
    }
    private clearCashe() {
        this.cashRangeEndPoint = 0;
        this.composite.change([]);
    }
    private setFocusRange(focusRange: LayersRange) {
        const cashRangeEndPointNew = focusRange.start;
        if (cashRangeEndPointNew === this.cashRangeEndPoint) return;
        if (cashRangeEndPointNew > this.layers.length) {
            this.clearCashe();
            return;
        }
        if (cashRangeEndPointNew < 0) {
            this.clearCashe();
            return;
        }
        if (cashRangeEndPointNew > this.cashRangeEndPoint) {
            const appenededLayers = this.layers.slice(this.cashRangeEndPoint, cashRangeEndPointNew);
            this.composite.appened(appenededLayers);
        }
        else {
            const cashedLayersNew = this.layers.slice(0, cashRangeEndPointNew);
            this.composite.change(cashedLayersNew);
        }
        this.cashRangeEndPoint = cashRangeEndPointNew;
    }
}
export type { LayersRange }
export { LayersCache }