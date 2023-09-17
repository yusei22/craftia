import { ILayer, ILayerImageSource } from './Ilayer';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerModel } from 'application/files/layer-tree-model/LayerModel';
import { ILayerPrefs, LayerPrefs, SystemLayerPrefs } from 'application/preferences';
interface IStaticLayer<T> extends ILayer {
    readonly source: ILayerImageSource;
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;
    /**
     * レイヤーの環境設定を変更(非破壊的)
     * @param editItem 編集する項目
     * @returns 新しいレイヤー
     */
    readonly editPrefs: (param: Partial<ILayerPrefs>) => T;
    readonly createLayerModel: (dataurlEncoder: DataURLEncoder) => LayerModel;
}

export type { IStaticLayer };
