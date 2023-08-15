import { LayerSettings } from "../../../layer-settings/LayerSettings";
import { SystemLayerSettings } from "../../../layer-settings/SystemLayerSettings";
import { WebGL2Layer } from "../WebGL2Layer";
import { Vec2} from "../../../../units";
import { createRasterizedImgBitmapLayer } from "../../rasterized/RasterizedImgBitmapLayer";
import { createRasterizedImgElementLayer } from "../../rasterized/RasterizedImgElementLayer";
import { createSmartImgBitmapLayer } from "../../smart-object/SmartImgBitmapLayer";
import { createSmartImgElementLayer } from "../../smart-object/SmartImgElementLayer";

class RasterizedWebGL2Layer extends WebGL2Layer {
    public settings: LayerSettings;
    get systemSettings() {
        return new SystemLayerSettings({ resize: new Vec2(this.canvas.width, this.canvas.height) })
    }
    constructor(settings: LayerSettings) {
        super();
        this.settings = settings.clone();
    }
    public viewportCanvas(size: Vec2): void {
        super.viewport(size);
    }
    public createRasterizedImgBitmapLayer() {
        return createRasterizedImgBitmapLayer(
            this.canvas,
            this.settings
        );
    }
    public createRasterizedImgElementLayer() {
        const dataURL = this.canvas.toDataURL();
        return createRasterizedImgElementLayer(
            dataURL,
            this.settings
        );
    }
    public createSmartImgBitmapLayer() {
        return createSmartImgBitmapLayer(
            this.canvas,
            this.settings,
            this.systemSettings.resize
        );
    }
    public createSmartImgElementLayer() {
        const dataURL = this.canvas.toDataURL();
        return createSmartImgElementLayer(
            dataURL,
            this.settings,
            this.systemSettings.resize
        );
    }
}
export { RasterizedWebGL2Layer }