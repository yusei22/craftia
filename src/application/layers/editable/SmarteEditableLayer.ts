import { ILayer, ILayerImageSource, ILayerType } from '../Ilayer';
import { createStaticSmartObjectLayer } from '../static-raw';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { LayerPrefs, SystemLayerPrefs } from 'application/preferences';

class SmartEditableLayer implements ILayer {
    readonly context: Context2D;
    readonly source: HTMLCanvasElement;
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;

    constructor(prefs: LayerPrefs, resize: Vec2) {
        this.context = new Context2D();
        this.source = this.context.getCanvas();
        this.preferences = prefs;
        this.systemPreferences = new SystemLayerPrefs({ resize });
    }
    public getLayerType(): ILayerType {
        return 'smart-object';
    }
    public toStatic() {
        return createStaticSmartObjectLayer(this.source, this.preferences, this.systemPreferences.resize);
    }
    public setSource(source: ILayerImageSource | ImageData) {
        if (source == null) {
            this.context.viewport(new Vec2(1, 1)).clear();
            return;
        }

        this.context.viewport(new Vec2(source.width, source.height));

        if (source instanceof ImageData) {
            this.context.putImageData(source, new Vec2(0, 0));
        } else {
            this.context.drawImage(source, new Vec2(0, 0));
        }
    }
}

export { SmartEditableLayer };
