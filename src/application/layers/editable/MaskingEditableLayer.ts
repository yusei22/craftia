import { ILayer } from '../Ilayer';
import { StaticMaskingLayer, createStaticRasterizedLayer } from '../static-raw';
import { Vec2 } from 'application/core/units';
import { IMaskingObject } from 'application/masking/IMaskingObject';
import { LayerPrefs, SystemLayerPrefs, IRenderingCelPrefs, RenderingCelPrefs } from 'application/preferences';
import { LayerRenderer, RenderingCel } from 'application/rendering';

class MaskingRenderer extends LayerRenderer {
    constructor() {
        super();
    }
    public renderMaskingObject(
        maskingObject: IMaskingObject,
        customSettings: Partial<IRenderingCelPrefs> = {}
    ) {
        const prefs = new RenderingCelPrefs({
            resize: new Vec2(maskingObject.source.width, maskingObject.source.height),
            globalLocation: maskingObject.preferences.globalLocation,
            opacity: maskingObject.preferences.opacity,
        }).cloneEdit(customSettings);

        this.renderCel(new RenderingCel(maskingObject.source, prefs));
    }
}

class MaskingEditableLayer<T extends ILayer, U extends IMaskingObject> implements ILayer {
    readonly source: HTMLCanvasElement;
    readonly preferences: LayerPrefs;
    public get systemPreferences() {
        return new SystemLayerPrefs({
            resize: this.renderer.context.size,
        });
    }
    readonly targetLayer: T;
    readonly masking: U;
    private renderer: MaskingRenderer;

    constructor(targetLayer: T, masking: U) {
        this.targetLayer = targetLayer;
        this.masking = masking;
        this.renderer = new MaskingRenderer();
        this.source = this.renderer.context.getCanvas();
        this.preferences = this.targetLayer.preferences;
    }
    public update() {
        this.renderer
            .clear()
            .viewport(this.targetLayer.systemPreferences.resize)
            .renderLayer(this.targetLayer, {
                blendMode: 'source-over',
                visible: true,
                opacity: 1.0,
                shadow: null,
            })
            .renderMaskingObject(this.masking, {
                globalLocation: this.targetLayer.preferences.globalLocation.sub(
                    this.masking.preferences.globalLocation
                ),
            });
    }
    public async toStatic() {
        const resultLayer = await createStaticRasterizedLayer(this.source, this.preferences);
        const targetLayer = await this.targetLayer.toStatic();
        const masking = await this.masking.toStatic();
        return new StaticMaskingLayer(resultLayer, targetLayer, masking, this.systemPreferences.resize);
    }
}
export { MaskingEditableLayer };
