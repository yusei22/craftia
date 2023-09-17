import { Vec2 } from 'application/core/units';
import { Preferences } from 'application/preferences/Preferences';

interface ISystemLayerPrefs {
    /**レイヤーレンダリング時のリサイズ情報 */
    readonly resize: Vec2;
}
class SystemLayerPrefs extends Preferences implements ISystemLayerPrefs {
    readonly resize: Vec2;

    constructor({ resize }: ISystemLayerPrefs) {
        super();
        this.resize = resize;
    }
    public cloneEdit({ resize }: Partial<ISystemLayerPrefs>) {
        return new SystemLayerPrefs({
            resize: resize ?? this.resize,
        });
    }
}

export type { ISystemLayerPrefs };
export { SystemLayerPrefs };
