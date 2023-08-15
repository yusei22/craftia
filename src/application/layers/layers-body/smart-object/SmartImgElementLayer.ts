import { LayerSettings } from "../../layer-settings/LayerSettings";
import { SystemLayerSettings } from "../../layer-settings/SystemLayerSettings";
import { Vec2 } from "../../../units";
import { createImageElement } from "../../../image-management/createImageElement";
import { ILayer } from "../Ilayer";
class SmartImgElementLayer implements ILayer {
    readonly source: HTMLImageElement;
    public settings: LayerSettings;
    public get systemSettings() {
        return this._systemSettings
    }
    private _systemSettings: SystemLayerSettings;
    constructor(source: HTMLImageElement, settings: LayerSettings, resize: Vec2) {
        this.source = source;
        this.settings = settings.clone();
        this._systemSettings = new SystemLayerSettings({ resize: resize.clone() })
    }
    public cloneAsync(): Promise<SmartImgElementLayer> {
        return createSmartImgElementLayer(this.source.src, this.settings, this._systemSettings.resize);
    }
    public changeResizeSettings(newSize: Vec2) {
        this._systemSettings = this._systemSettings.cloneEdit({ resize: newSize })
    }
}
async function createSmartImgElementLayer(
    src: string,
    layerSettings: LayerSettings,
    resize: Vec2
): Promise<SmartImgElementLayer> {
    let imageElement: HTMLImageElement
    try {
        imageElement = await createImageElement(src)
    } catch (e) {
        throw Error("Failed to create ReadonlyImgElementLayer");
    }
    return new SmartImgElementLayer(imageElement, layerSettings, resize)
}
export { SmartImgElementLayer, createSmartImgElementLayer }