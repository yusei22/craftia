import { Ctx2DConsumer } from "../../../canvas/Ctx2DConsumer";
import { createCanvasAnd2DContext } from "../../../canvas/createCanvas";
import { SystemLayerSettings } from "../../layer-settings/SystemLayerSettings";
import { Vec2 } from "../../../units";
import { ILayer } from "../Ilayer";
import { modifyAndRenderLayerCtx2D } from "../../layers-rendering-system/renderer/core/modifyAndRenderLayerCtx2D";
import { RasterizedLayer ,SmartObjectLayer } from "../../../types";

type MaskableLayer = RasterizedLayer | SmartObjectLayer

type MaskingSource = RasterizedLayer

class MaskingLayer extends Ctx2DConsumer implements ILayer {
    public originalLayer: MaskableLayer;
    public maskingSource: MaskingSource;

    public maskOpacity: number = 1.0;
    public get canvas() {
        return this.getCanvas();
    }
    public get source() {
        return this.canvas;
    }
    public get settings() {
        return this.originalLayer.settings.cloneEdit({
            globalLocation: new Vec2(0, 0)
        });
    }
    public get systemSettings() {
        return this._systemSettings
    }
    private _systemSettings: SystemLayerSettings;
    constructor(originalLayer: MaskableLayer, maskingSource: MaskingSource, size: Vec2) {
        super(createCanvasAnd2DContext().context);
        this.originalLayer = originalLayer;
        this.maskingSource = maskingSource;
        this.viewport(size);
        this._systemSettings = new SystemLayerSettings({ resize: size })
        this.update();
    }
    public update() {
        this.clear();
        this.useContext2D((ctx: CanvasRenderingContext2D) => {
            modifyAndRenderLayerCtx2D(ctx, this.originalLayer, {
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadow: null
            })
            modifyAndRenderLayerCtx2D(ctx, this.maskingSource, {
                globalLocation: new Vec2(0, 0),
                visible: true,
                blendMode: 'destination-out',
                opacity: this.maskOpacity,
                shadow: null,
            })
        })
    }
}
export { MaskingLayer };