import { LayerSettings } from "../../../layer-settings/LayerSettings";
import { SystemLayerSettings } from "../../../layer-settings/SystemLayerSettings";
import { WebGL2Layer } from "../WebGL2Layer";
import { Vec2 } from "../../../../units";
import { createRasterizedImgBitmapLayer } from "../../rasterized/RasterizedImgBitmapLayer";
import { createRasterizedImgElementLayer } from "../../rasterized/RasterizedImgElementLayer";
import { createSmartImgBitmapLayer } from "../../smart-object/SmartImgBitmapLayer";
import { createSmartImgElementLayer } from "../../smart-object/SmartImgElementLayer";
import { ImageRenderer } from "../../../../image-management/ImageRenderer";

class SmartWebGL2Layer extends WebGL2Layer {
    public settings: LayerSettings;
    private _systemSettings: SystemLayerSettings;
    get systemSettings() {
        return this._systemSettings
    }
    constructor(settings: LayerSettings, resize: Vec2) {
        super();
        this.settings = settings.clone();
        this._systemSettings = new SystemLayerSettings({ resize: resize })
    }
    public viewportCanvas(size: Vec2): void {
        super.viewport(size);
    }
    public changeResizeSettings(newSize: Vec2) {
        this._systemSettings = this._systemSettings.cloneEdit({ resize: newSize })
    }
    public createRasterizedImgBitmapLayer() {
        const rasterizedSource = this.createRasterizedSource()
        return createRasterizedImgBitmapLayer(
            rasterizedSource,
            this.settings
        )
    }
    public createRasterizedImgElementLayer() {
        const rasterizedSource = this.createRasterizedSource();
        const dataURL = rasterizedSource.toDataURL();
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
        )
    }
    public createSmartImgElementLayer() {
        const dataURL = this.canvas.toDataURL();
        return createSmartImgElementLayer(
            dataURL,
            this.settings,
            this.systemSettings.resize
        )
    }
    private createRasterizedSource() {
        const renderer = new ImageRenderer();
        renderer.viewport(this._systemSettings.resize);
        renderer.drawImage(
            this.canvas,
            new Vec2(0, 0),
            this._systemSettings.resize
        );
        return renderer.canvas;
    }
}
export { SmartWebGL2Layer }