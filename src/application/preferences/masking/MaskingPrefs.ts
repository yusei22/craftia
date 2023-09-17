import { Preferences } from '../Preferences';
import { Vec2 } from 'application/core/units';

interface IMaskingPrefs {
    /**グローバル位置 */
    readonly globalLocation: Vec2;
    /**透明度 */
    readonly opacity: number;
}
class MaskingPrefs extends Preferences implements IMaskingPrefs {
    readonly globalLocation: Vec2;
    readonly opacity: number;

    constructor({ globalLocation, opacity }: Partial<IMaskingPrefs> = {}) {
        super();
        this.globalLocation = globalLocation ?? new Vec2(0, 0);
        this.opacity = opacity ?? 1.0;
    }
    public cloneEdit({ globalLocation, opacity }: Partial<IMaskingPrefs>) {
        return new MaskingPrefs({
            globalLocation: globalLocation ?? this.globalLocation,
            opacity: opacity ?? this.opacity,
        });
    }
}
export type { IMaskingPrefs };
export { MaskingPrefs };
