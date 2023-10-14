import { Sprite, SpriteConfig, SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

export interface PreviewerPrefs extends SpritePrefs {
    readonly scale: Vec2;
    readonly rotation: number;
}
export type PreviewerSource = HTMLCanvasElement | OffscreenCanvas | ImageBitmap;

export abstract class Previewer extends Sprite<PreviewerPrefs> {
    public readonly source: PreviewerSource;

    constructor(source: PreviewerSource, prefs: PreviewerPrefs) {
        const config: SpriteConfig = {
            line: null,
            shadow: {
                shadowBlur: prefs.shadowBlur,
                shadowColor: prefs.shadowColor,
                shadowOffset: prefs.shadowOffset,
            },
            text: null,
            fillStyle: null,
            globalAlpha: prefs.opacity,
            globalCompositeOperation: prefs.blendMode,
            strokeStyle: null,
        };
        super(config, prefs);
        this.source = source;
    }
    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }
    private setContextDrawTrans(context: Context2D) {
        context.translate(this.prefs.globalLocation);
        context.rotate(this.prefs.rotation);
        context.translate(this.prefs.globalLocation.times(-1));
    }
    public drawFunc(context: Context2D) {
        this.setContextDrawTrans(context);
        context.drawImage(this.source, this.getStartPoint(), this.prefs.scale);
    }
    public drawPointFunc(context: Context2D, point: Vec2) {
        this.setContextDrawTrans(context);
        context.drawImage(
            this.source,
            point,
            new Vec2(1, 1),
            this.getStartPoint(),
            this.prefs.scale
        );
    }
}
