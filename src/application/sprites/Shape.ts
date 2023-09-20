import { Context2D } from '../core/context-2d';
import { Vec2 } from '../core/units';
import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';

interface ShapePrefs extends SpritePrefs {
    readonly size: Vec2;
    readonly strokeStyle: string | CanvasGradient | CanvasPattern | null;
    readonly strokeCap: CanvasLineCap | null;
    readonly strokeDashOffset: number | null;
    readonly strokeJoin: CanvasLineJoin | null;
    readonly strokeWidth: number | null;
    readonly fillStyle: string | CanvasGradient | CanvasPattern | null;
    readonly scale: Vec2;
}
abstract class Shape<T extends ShapePrefs = ShapePrefs> extends Sprite<T> {
    constructor(config: SpriteConfig, prefs: T) {
        super(config, prefs);
    }
    public abstract drawFunc(context: Context2D): void;
}
export type { ShapePrefs };
export { Shape };
