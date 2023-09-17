import { IStaticLayer } from '../IStaticLayer';
import { ILayerType } from '../Ilayer';
import { Vec2 } from 'application/core/units';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerModel, LayerPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { ILayerPrefs, LayerPrefs, SystemLayerPrefs } from 'application/preferences';

class StaticRasterizedEmptyLayer implements IStaticLayer<StaticRasterizedEmptyLayer> {
    readonly source: null;
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;
    constructor(prefs: LayerPrefs) {
        this.source = null;
        this.preferences = prefs;
        this.systemPreferences = new SystemLayerPrefs({ resize: new Vec2(0, 0) });
    }
    public getLayerType(): ILayerType {
        return 'rasterized';
    }
    /**
     * レイヤーの環境設定を変更(非破壊的)
     * @param editItem 編集する項目
     * @returns 新しいレイヤー
     */
    public editPrefs(editItem: Partial<ILayerPrefs>): StaticRasterizedEmptyLayer {
        return new StaticRasterizedEmptyLayer(this.preferences.cloneEdit(editItem));
    }
    public toStatic(): Promise<StaticRasterizedEmptyLayer> {
        return new Promise((resolve) => {
            resolve(this);
        });
    }
    public createLayerModel(dataurlEncoder: DataURLEncoder): LayerModel {
        const layerbodyModel: Omit<LayerModel, keyof LayerPrefsModel> = {
            src: null,
            type: 'rasterized',
            resize: this.systemPreferences.resize.toArray(),
            masking: null,
        };

        return Object.assign(this.preferences.createLayerPrefsModel(), layerbodyModel);
    }
}
export { StaticRasterizedEmptyLayer };
