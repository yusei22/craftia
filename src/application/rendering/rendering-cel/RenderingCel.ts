import { ILayer, ILayerImageSource } from 'application/layers/Ilayer';
import { RenderingCelPrefs } from 'application/preferences';

class RenderingCel {
    readonly source: ILayerImageSource;
    readonly preferences: RenderingCelPrefs;

    constructor(source: ILayerImageSource, prefs: RenderingCelPrefs) {
        this.source = source;
        this.preferences = prefs;
    }
}

export { RenderingCel };
