import { LayerSettings } from "../../layer-settings/LayerSettings";
import { SystemLayerSettings } from "../../layer-settings/SystemLayerSettings";
import { LayerRenderer } from "../../layers-rendering-system/renderer/LayerRenderer";
import { Layer } from "application/types";
import { Vec2 } from "application/units";
import { ILayer } from "../Ilayer";

class CompositeLayer implements ILayer {
    private renderer: LayerRenderer;
    public settings: LayerSettings;
    public get systemSettings() {
        return new SystemLayerSettings({
            resize: new Vec2(
                this.source.width,
                this.source.height
            )
        })
    }
    public get source() {
        return this.renderer.canvas;
    }
    constructor(settings: LayerSettings, size: Vec2) {
        this.renderer = new LayerRenderer();
        this.renderer.viewport(size);
        this.settings = settings.clone();
    }
    public change(layers: Layer[]) {
        if (layers.length <= 0) {
            this.renderer.clear();
            return;
        }
        this.renderer.redraw(layers);
    }
    public appened(layers: Layer[]) {
        if (layers.length <= 0) return;
        this.renderer.drawAbove(layers);
    }
}
export { CompositeLayer }