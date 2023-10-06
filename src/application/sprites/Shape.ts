import { Context2D } from '../core/context-2d';
import { Vec2, Vec4 } from '../core/units';
import { Sprite, SpriteConfig, SpritePrefs, SpriteFillStyle, SpritePrefsValue } from './Sprite';

interface ShapePrefs extends SpritePrefs {
    fillStyle: SpriteFillStyle;
    strokeCap: CanvasLineCap | null;
    strokeDashOffset: number | null;
    strokeJoin: CanvasLineJoin | null;
    strokeWidth: number | null;
    strokeStyle: SpriteFillStyle;
    scale: Vec2;
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

    public drawPointFunc(context: Context2D) {
        this.drawFunc(context);
    }
}
export type { ShapePrefs };
export { Shape };
