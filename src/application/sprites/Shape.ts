import { Sprite, SpriteConfig, SpritePrefs } from "./Sprite";
import { Context2D } from "../core/context-2d";
import { Vec2 } from "../core/units";

interface ShapePrefs extends SpritePrefs {
    readonly size: Vec2;
    readonly strokeWidth: number;
    readonly strokeStyle: string | CanvasGradient | CanvasPattern;
    readonly drawStrokeToBack: boolean;
}
abstract class Shape<T extends ShapePrefs> extends Sprite<T>{
    constructor(config: SpriteConfig, prefs: T) {
        super(config, prefs)
    }
    public abstract drawFunc(context: Context2D): void
}
export { Shape };