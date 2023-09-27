import {
    Context2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { Vec, Vec2 } from 'application/core/units';

interface SpriteConfig {
    readonly line: ContextLineConfig | null;
    readonly shadow: ContextShadowConfig | null;
    readonly text: ContextTextConfig | null;
    readonly fillStyle: string | CanvasGradient | CanvasPattern | null;
    readonly globalAlpha: number | null;
    readonly globalCompositeOperation: GlobalCompositeOperation | null;
    readonly strokeStyle: string | CanvasGradient | CanvasPattern | null;
}

interface SpritePrefs {
    [key: string]: string | number | boolean | null | Vec | CanvasGradient | CanvasPattern;

    /**名前 */
    readonly name: string;
    /**基準点 */
    readonly anchor: Vec2;
    /**グローバル位置 */
    readonly globalLocation: Vec2;
    /**回転 */
    readonly rotation: number;
    /**可視 */
    readonly visible: boolean;
    /**ブレンドモード */
    readonly blendMode: GlobalCompositeOperation;
    /**透明度 */
    readonly opacity: number;
    /**影のぼかし */
    readonly shadowBlur: number | null;
    /**影の色 */
    readonly shadowColor: string | null;
    /**影の位置 */
    readonly shadowOffset: Vec2 | null;
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
            .setFillStyle(this.config.fillStyle)
            .setGlobalAlpha(this.config.globalAlpha)
            .setGlobalCompositeOperation(this.config.globalCompositeOperation);
    }
    public draw(context: Context2D) {
        context.resetTransform();
        this.setconfig(context);
        this.drawFunc(context);
    }
    abstract drawFunc(context: Context2D): void;
}

export type { SpriteConfig, SpritePrefs };
export { Sprite };
