import { IMaskingObject, MaskingImageSource } from './IMaskingObject';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerMaskingPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { IMaskingPrefs, MaskingPrefs } from 'application/preferences/masking/MaskingPrefs';

class StaticMaskingObject implements IMaskingObject {
    readonly preferences: MaskingPrefs;
    readonly source: ImageBitmap;

    constructor(source: ImageBitmap, prefs: MaskingPrefs) {
        this.source = source;
        this.preferences = prefs;
    }
    public editPrefs(editItem: Partial<IMaskingPrefs>) {
        return new StaticMaskingObject(this.source, this.preferences.cloneEdit(editItem));
    }
    public createMaskingPrefsModel(dataURLEncoder: DataURLEncoder): LayerMaskingPrefsModel {
        return {
            src: dataURLEncoder.encode(this.source),
            globalLocation: this.preferences.globalLocation.toArray(),
            opacity: this.preferences.opacity,
        };
    }
    public toStatic(): Promise<StaticMaskingObject> {
        return new Promise<StaticMaskingObject>((resolve) => {
            resolve(this);
        });
    }
}

async function createStaticMaskingObject(source: MaskingImageSource, prefs: MaskingPrefs) {
    return createImageBitmap(source).then((imageBitmap) => new StaticMaskingObject(imageBitmap, prefs));
}

export { StaticMaskingObject, createStaticMaskingObject };
