import { IStaticLayer } from '../IStaticLayer';
import { ILayerType } from '../Ilayer';
import { Vec2 } from 'application/core/units';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerModel, LayerPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { ILayerPrefs, LayerPrefs, SystemLayerPrefs } from 'application/preferences';

class StaticRasterizedLayer implements IStaticLayer<StaticRasterizedLayer> {
    readonly source: ImageBitmap;
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;

    constructor(source: ImageBitmap, prefs: LayerPrefs) {
        this.source = source;
        this.preferences = prefs;
        this.systemPreferences = new SystemLayerPrefs({
            resize: new Vec2(source.width, source.height),
        });
    }
    public getLayerType(): ILayerType {
        return 'rasterized';
    }
    /**
     * レイヤーの環境設定を変更(非破壊的)
     * @param editItem 編集する項目
     * @returns 新しいレイヤー
     */
    public editPrefs(editItem: Partial<ILayerPrefs>) {
        return new StaticRasterizedLayer(this.source, this.preferences.cloneEdit(editItem));
    }
    public toStatic(): Promise<StaticRasterizedLayer> {
        return new Promise((resolve) => {
            resolve(this);
        });
    }
    public createLayerModel(dataurlEncoder: DataURLEncoder): LayerModel {
        const layerbodyModel: Omit<LayerModel, keyof LayerPrefsModel> = {
            src: dataurlEncoder.encode(this.source),
            type: 'rasterized',
            resize: this.systemPreferences.resize.toArray(),
            masking: null,
        };

        return Object.assign(this.preferences.createLayerPrefsModel(), layerbodyModel);
    }
}

/**
 * 新規`StaticRasterizedLayer`を作成する
 * @param source ソース
 * @param prefs レイヤー設定
 * @returns 新しい`StaticRasterizedLayer`
 */
function createStaticRasterizedLayer(
    source: ImageBitmapSource,
    prefs: LayerPrefs
): Promise<StaticRasterizedLayer> {
    return createImageBitmap(source).then((imageBitmap) => new StaticRasterizedLayer(imageBitmap, prefs));
}
export { StaticRasterizedLayer, createStaticRasterizedLayer };
