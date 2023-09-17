import { ShadowPrefs } from '../shadow/ShadowPrefs';
import { Vec2 } from 'application/core/units';
import { LayerPrefsModel } from 'application/files/layer-tree-model/LayerModel';
import { Preferences } from 'application/preferences/Preferences';
interface ILayerPrefs {
    /**レイヤーの名前 */
    readonly name: string;
    /**レイヤーのグローバル位置 */
    readonly globalLocation: Vec2;
    /**レイヤーの可視 */
    readonly visible: boolean;
    /**レイヤーのブレンドモード */
    readonly blendMode: GlobalCompositeOperation;
    /**レイヤーの透明度 */
    readonly opacity: number;
    /**レイヤーの影 */
    readonly shadow: ShadowPrefs | null;
}

class LayerPrefs extends Preferences implements ILayerPrefs {
    readonly name: string;
    readonly globalLocation: Vec2;
    readonly visible: boolean;
    readonly blendMode: GlobalCompositeOperation;
    readonly opacity: number;
    readonly shadow: ShadowPrefs | null;

    constructor({ name, globalLocation, visible, blendMode, opacity, shadow }: Partial<ILayerPrefs> = {}) {
        super();
        this.name = name ?? '';
        this.globalLocation = globalLocation ?? new Vec2(0, 0);
        this.visible = visible ?? true;
        this.blendMode = blendMode ?? 'source-over';
        this.opacity = opacity ?? 1.0;
        this.shadow = shadow ?? null;
    }
    public cloneEdit({ name, globalLocation, visible, blendMode, opacity, shadow }: Partial<ILayerPrefs>) {
        return new LayerPrefs({
            name: name ?? this.name,
            globalLocation: globalLocation ?? this.globalLocation,
            visible: visible ?? this.visible,
            blendMode: blendMode ?? this.blendMode,
            opacity: opacity ?? this.opacity,
            shadow: typeof shadow === 'undefined' ? this.shadow : shadow,
        });
    }
    public createLayerPrefsModel(): LayerPrefsModel {
        return {
            name: this.name,
            globalLocation: this.globalLocation.toArray(),
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            shadow:
                this.shadow === null
                    ? null
                    : {
                          color: this.shadow.color.toArray(),
                          shadowOffset: this.shadow.shadowOffset.toArray(),
                          shadowBlur: this.shadow.shadowBlur,
                      },
        };
    }
}
export type { ILayerPrefs };
export { LayerPrefs };
