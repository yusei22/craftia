import { FillLinerGradient, FillPattern, FillRadialGradient, FillSolid } from './SpriteFill';
import {
    Context2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { Vec, Vec2 } from 'application/core/units';

type SpriteFillStyle = null | FillLinerGradient | FillRadialGradient | FillPattern | FillSolid;

interface SpriteConfig {
    readonly line: ContextLineConfig | null;
    readonly shadow: ContextShadowConfig | null;
    readonly text: ContextTextConfig | null;
    readonly fillStyle: SpriteFillStyle;
    readonly globalAlpha: number | null;
    readonly globalCompositeOperation: GlobalCompositeOperation | null;
    readonly strokeStyle: SpriteFillStyle;
}

type SpritePrefsValue = string | number | boolean | null | Vec | SpriteFillStyle;

interface SpritePrefs {
    [key: string]: SpritePrefsValue;
    /**id */
    id: string;
    /**名前 */
    name: string;
    /**基準点 */
    anchor: Vec2;
    /**グローバル位置 */
    globalLocation: Vec2;
    /**回転 */
    rotation: number;
    /**可視 */
    visible: boolean;
    /**ブレンドモード */
    blendMode: GlobalCompositeOperation;
    /**透明度 */
    opacity: number;
    /**影のぼかし */
    shadowBlur: number | null;
    /**影の色 */
    shadowColor: string | null;
    /**影の位置 */
    shadowOffset: Vec2 | null;
}

abstract class Sprite<T extends SpritePrefs = SpritePrefs> {
    readonly config: SpriteConfig;
    readonly prefs: T;

    constructor(config: SpriteConfig, prefs: T) {
        this.config = config;
        this.prefs = prefs;
    }
    private setconfig(context: Context2D) {
        context
            .setLineConfig(this.config.line)
            .setShadowConfig(this.config.shadow)
            .setTextConfig(this.config.text)
            .setGlobalAlpha(this.config.globalAlpha)
            .setGlobalCompositeOperation(this.config.globalCompositeOperation)
            .setFillStyle(
                this.config.fillStyle === null
                    ? null
                    : this.config.fillStyle.createCanvasFillStyle(context)
            )
            .setStrokeStyle(
                this.config.strokeStyle === null
                    ? null
                    : this.config.strokeStyle.createCanvasFillStyle(context)
            );
    }
    public draw(context: Context2D) {
        if (!this.prefs.visible) return;

        context.resetTransform();
        this.setconfig(context);
        this.drawFunc(context);
    }
    public drawPoint(context: Context2D, point: Vec2) {
        if (!this.prefs.visible) return;
        context.resetTransform();
        this.setconfig(context);
        this.drawPointFunc(context, point);
    }
    abstract drawFunc(context: Context2D): void;
    abstract drawPointFunc(context: Context2D, point: Vec2): void;
    abstract clone(): Sprite;
    abstract getStartPoint(): Vec2;
    abstract getCenterPoint(): Vec2;
}

export type { SpriteConfig, SpritePrefs, SpritePrefsValue, SpriteFillStyle };
export { Sprite };
