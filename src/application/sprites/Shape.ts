import { Context2D } from '../core/context-2d';
import { Vec2 } from '../core/units';
import { Sprite, SpriteConfig, SpritePrefs, SpriteFillStyle } from './Sprite';

interface ShapePrefs extends SpritePrefs {
    readonly fillStyle: SpriteFillStyle;
    readonly strokeCap: CanvasLineCap | null;
    readonly strokeDashOffset: number | null;
    readonly strokeJoin: CanvasLineJoin | null;
    readonly strokeWidth: number | null;
    readonly strokeStyle: SpriteFillStyle;
    readonly scale: Vec2;
    readonly rotation: number;
}
abstract class Shape<T extends ShapePrefs = ShapePrefs> extends Sprite<T> {
    constructor(config: SpriteConfig, prefs: T) {
        super(config, prefs);
    }
    public abstract drawFunc(context: Context2D): void;

    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }

    public getCenterPoint() {
        return this.getStartPoint().add(this.prefs.scale.times(0.5));
    }
    public createStatic() {
        return new Promise<Shape<T>>((resolve) => {
            resolve(this);
        });
    }
}
export type { ShapePrefs };
export { Shape };
