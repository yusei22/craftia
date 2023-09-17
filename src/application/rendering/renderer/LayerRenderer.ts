import { RenderingCel } from '../rendering-cel/RenderingCel';
import { CelRenderer } from './CelRenderer';
import { Vec2 } from 'application/core/units';
import { ILayer } from 'application/layers/Ilayer';
import { IRenderingCelPrefs, RenderingCelPrefs } from 'application/preferences/';

class LayerRenderer extends CelRenderer {
    constructor(size?: Vec2) {
        super(size);
    }
    public renderLayer(layer: ILayer, customSettings: Partial<IRenderingCelPrefs> = {}) {
        const prefs = new RenderingCelPrefs({
            cropLocation: null,
            cropSize: null,
            resize: layer.systemPreferences.resize,
            globalLocation: layer.preferences.globalLocation,
            visible: layer.preferences.visible,
            blendMode: layer.preferences.blendMode,
            opacity: layer.preferences.opacity,
            shadow: layer.preferences.shadow,
        }).cloneEdit(customSettings);

        super.renderCel(new RenderingCel(layer.source, prefs));
        return this;
    }
}

export { LayerRenderer };
