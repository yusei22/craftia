import { Sprite, SpritePrefs } from './Sprite';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export interface PreviewerPrefs extends SpritePrefs {
    readonly scale: Vec2;
    readonly rotation: number;
}
export type PreviewerSource = HTMLCanvasElement | OffscreenCanvas | ImageBitmap;

export abstract class ImagePreviewer extends Sprite<PreviewerPrefs> {
    public readonly source: PreviewerSource;

    constructor(source: PreviewerSource, prefs: PreviewerPrefs) {
        super(prefs);
        this.source = source;
    }
    public abstract setPreviewerPrefs(
        valOrUpdater: ValueUpdater<PreviewerPrefs> | PreviewerPrefs
    ): ImagePreviewer;

    public getStartPoint() {
        const anchorRerativeLoc = new Vec2(
            this.prefs.anchor.x * this.prefs.scale.x,
            this.prefs.anchor.y * this.prefs.scale.y
        );
        return this.prefs.globalLocation.sub(anchorRerativeLoc);
    }

    public _drawFunc(context: AbstractContext2D, prefs: PreviewerPrefs) {
        this.setconfig(context, {
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
        });
        context.translate(prefs.globalLocation);
        context.rotate(prefs.rotation);
        context.translate(prefs.globalLocation.times(-1));
        context.drawImage(this.source, this.getStartPoint(), prefs.scale);
    }

    public drawFunc(context: AbstractContext2D) {
        this._drawFunc(context, this.prefs);
    }
    public drawZoomFunc(context: AbstractContext2D, contextAux: AbstractContext2D, zoom: number) {
        this._drawFunc(context, {
            ...this.prefs,
            scale: this.prefs.scale.times(zoom),
            globalLocation: this.prefs.globalLocation.times(zoom),
            shadowBlur: this.prefs.shadowBlur ? this.prefs.shadowBlur * zoom : null,
        });
    }
}
