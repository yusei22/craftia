import { ILayerType } from './Ilayer';
import {
    IStaticLayer,
    StaticRasterizedEmptyLayer,
    StaticRasterizedLayer,
    StaticSmartObjectLayer,
} from './static-raw';
import { Vec2 } from 'application/core/units';
import { DataURLEncoder } from 'application/files/data-url/DataURLEncoder';
import { LayerModel, LayerPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { StaticMaskingObject } from 'application/masking/StaticMaskingObject';
import { ILayerPrefs } from 'application/preferences';

type StaticMaskingTargetLayer = StaticRasterizedEmptyLayer | StaticRasterizedLayer | StaticSmartObjectLayer;

class StaticMaskingLayer<T extends StaticMaskingTargetLayer> implements IStaticLayer<StaticMaskingLayer<T>> {
    readonly targetLayer: T;
    readonly masking: StaticMaskingObject;
    readonly resultLayer: StaticRasterizedLayer;
    readonly sceneSize: Vec2;

    constructor(
        resultLayer: StaticRasterizedLayer,
        targetLayer: T,
        masking: StaticMaskingObject,
        sceneSize: Vec2
    ) {
        this.resultLayer = resultLayer;
        this.targetLayer = targetLayer;
        this.masking = masking;
        this.sceneSize = sceneSize;
    }
    public get source() {
        return this.resultLayer.source;
    }
    public get preferences() {
        return this.resultLayer.preferences;
    }
    public get systemPreferences() {
        return this.resultLayer.systemPreferences;
    }
    public editPrefs(param: Partial<ILayerPrefs>) {
        return new StaticMaskingLayer<T>(
            this.resultLayer,
            this.targetLayer.editPrefs(param) as T,
            this.masking,
            this.sceneSize
        );
    }
    public createLayerModel(dataurlEncoder: DataURLEncoder): LayerModel {
        const layerbodyModel: Omit<LayerModel, keyof LayerPrefsModel> = {
            src: dataurlEncoder.encode(this.targetLayer.source),
            type: this.getLayerType(),
            resize: this.systemPreferences.resize.toArray(),
            masking: this.masking.createMaskingPrefsModel(dataurlEncoder),
        };

        return Object.assign(this.preferences.createLayerPrefsModel(), layerbodyModel);
    }
    public getLayerType(): ILayerType {
        return this.targetLayer.getLayerType();
    }
    public toStatic(): Promise<StaticMaskingLayer<T>> {
        return new Promise((resolve) => {
            resolve(this);
        });
    }
}

export type { StaticMaskingTargetLayer };
export { StaticMaskingLayer };
