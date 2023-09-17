import { Preferences } from '../Preferences';
import { Vec2, Vec4 } from 'application/core/units';
interface IShadowPrefs {
    /**影の色 */
    readonly color: Vec4;
    /**影の位置 */
    readonly shadowOffset: Vec2;
    /**影のぼかし */
    readonly shadowBlur: number;
}

class ShadowPrefs extends Preferences implements IShadowPrefs {
    readonly color: Vec4;
    readonly shadowOffset: Vec2;
    readonly shadowBlur: number;
    constructor({ color, shadowOffset, shadowBlur }: Partial<IShadowPrefs>) {
        super();
        this.color = color ?? new Vec4(0, 0, 0, 0);
        this.shadowOffset = shadowOffset ?? new Vec2(0, 0);
        this.shadowBlur = shadowBlur ?? 0.0;
    }
    public cloneEdit({ color, shadowBlur, shadowOffset }: Partial<IShadowPrefs>) {
        return new ShadowPrefs({
            color: color ?? this.color,
            shadowBlur: shadowBlur ?? this.shadowBlur,
            shadowOffset: shadowOffset ?? this.shadowOffset,
        });
    }
}
export type { IShadowPrefs };
export { ShadowPrefs };
