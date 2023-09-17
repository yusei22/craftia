import { ShadowPrefs } from '../shadow/ShadowPrefs';
import { Vec2 } from 'application/core/units';
import { Preferences } from 'application/preferences/Preferences';

interface IRenderingCelPrefs {
    /**クロップ開始位置 */
    readonly cropLocation: Vec2 | null;
    /**クロップするサイズ */
    readonly cropSize: Vec2 | null;
    /**リサイズ */
    readonly resize: Vec2 | null;
    /**グローバル位置 */
    readonly globalLocation: Vec2;
    /**可視 */
    readonly visible: boolean;
    /**ブレンドモード */
    readonly blendMode: GlobalCompositeOperation;
    /**透明度 */
    readonly opacity: number;
    /**影 */
    readonly shadow: ShadowPrefs | null;
}

class RenderingCelPrefs extends Preferences implements IRenderingCelPrefs {
    readonly cropLocation: Vec2 | null;
    readonly cropSize: Vec2 | null;
    readonly resize: Vec2 | null;
    readonly globalLocation: Vec2;
    readonly visible: boolean;
    readonly blendMode: GlobalCompositeOperation;
    readonly opacity: number;
    readonly shadow: ShadowPrefs | null;

    constructor({
        cropLocation,
        cropSize,
        resize,
        globalLocation,
        visible,
        blendMode,
        opacity,
        shadow,
    }: Partial<IRenderingCelPrefs> = {}) {
        super();
        this.cropLocation = cropLocation ?? null;
        this.cropSize = cropSize ?? null;
        this.resize = resize ?? null;
        this.globalLocation = globalLocation ?? new Vec2(0, 0);
        this.visible = visible ?? true;
        this.blendMode = blendMode ?? 'source-over';
        this.opacity = opacity ?? 1.0;
        this.shadow = shadow ?? null;
    }
    public cloneEdit({
        cropLocation,
        cropSize,
        resize,
        globalLocation,
        visible,
        blendMode,
        opacity,
        shadow,
    }: Partial<IRenderingCelPrefs> = {}): RenderingCelPrefs {
        return new RenderingCelPrefs({
            cropLocation: typeof cropLocation === 'undefined' ? this.cropLocation : cropLocation,
            cropSize: typeof cropSize === 'undefined' ? this.cropSize : cropSize,
            resize: typeof resize === 'undefined' ? this.resize : resize,
            globalLocation: typeof globalLocation === 'undefined' ? this.globalLocation : globalLocation,
            visible: typeof visible === 'undefined' ? this.visible : visible,
            blendMode: typeof blendMode === 'undefined' ? this.blendMode : blendMode,
            opacity: typeof opacity === 'undefined' ? this.opacity : opacity,
            shadow: typeof shadow === 'undefined' ? this.shadow : shadow,
        });
    }
}
export type { IRenderingCelPrefs };
export { RenderingCelPrefs };
