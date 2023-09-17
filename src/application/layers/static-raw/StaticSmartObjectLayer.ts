import { IStaticLayer } from '../IStaticLayer';
import { ILayerType } from '../Ilayer';
import { Vec2 } from 'application/core/units';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerModel, LayerPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { ILayerPrefs, LayerPrefs, SystemLayerPrefs } from 'application/preferences';

class StaticSmartObjectLayer implements IStaticLayer<StaticSmartObjectLayer> {
    readonly source: ImageBitmap;
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;

    constructor(source: ImageBitmap, prefs: LayerPrefs, resize: Vec2) {
        this.source = source;
        this.preferences = prefs;
        this.systemPreferences = new SystemLayerPrefs({ resize: resize });
    }
    public getLayerType(): ILayerType {
        return 'smart-object';
    }
    /**
     * レイヤーの環境設定設定を変更(非破壊的)
     * @param editItem 編集する項目
     * @returns 新しいレイヤー
     */
    public editPrefs(editItem: Partial<ILayerPrefs>): StaticSmartObjectLayer {
        return new StaticSmartObjectLayer(
            this.source,
            this.preferences.cloneEdit(editItem),
            this.systemPreferences.resize
        );
    }
    /**
     * レイヤーのリサイズ環境設定を変更(非破壊的)
     * @param resize 適用するサイズ
     * @returns リサイズした新しいレイヤー
     */
    public editResizePrefs(resize: Vec2) {
        return new StaticSmartObjectLayer(this.source, this.preferences, resize);
    }
    /**
     * 静的レイヤーを得る
     * @returns 自身
     */
    public toStatic(): Promise<StaticSmartObjectLayer> {
        return new Promise((resolve) => {
            resolve(this);
        });
    }
    public createLayerModel(dataurlEncoder: DataURLEncoder): LayerModel {
        const layerbodyModel: Omit<LayerModel, keyof LayerPrefsModel> = {
            src: dataurlEncoder.encode(this.source),
            type: this.getLayerType(),
            resize: this.systemPreferences.resize.toArray(),
            masking: null,
        };

        return Object.assign(this.preferences.createLayerPrefsModel(), layerbodyModel);
    }
}

/**
 * 新規`StaticSmartObjectLayer`を作成する
 * @param source ソース
 * @param prefs レイヤー設定
 * @param resize レイヤーのリサイズ
 * @returns 新しい`StaticSmartObjectLayer`
 */
function createStaticSmartObjectLayer(
    source: ImageBitmapSource,
    prefs: LayerPrefs,
    resize: Vec2
): Promise<StaticSmartObjectLayer> {
    return createImageBitmap(source).then(
        (imageBitmap) => new StaticSmartObjectLayer(imageBitmap, prefs, resize)
    );
}

export { StaticSmartObjectLayer, createStaticSmartObjectLayer };
