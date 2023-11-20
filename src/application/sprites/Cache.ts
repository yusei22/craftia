import { BaseSprite, BaseSpritePrefs } from './BaseSprite';
import { SpritePrefs } from './Sprite';
import { AbstractContext2D, Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export interface CacheDrawConfig extends BaseSpritePrefs {
    readonly scale: Vec2;
    readonly rotation: number;
}

export class Cache<T extends SpritePrefs> extends BaseSprite {
    private readonly context: Context2D;

    private configs: CacheDrawConfig;
    private _deps: T | null;

    constructor(prefs: CacheDrawConfig, deps: T | null) {
        super();
        this.configs = prefs;
        this.context = new Context2D();
        this._deps = deps;
    }

    public get deps() {
        return this._deps;
    }

    public update(updater: (cacheContext: AbstractContext2D) => unknown, newDeps: T) {
        updater(this.context);
        this._deps = newDeps;
    }

    public setDrawConfigs(valOrUpdater: ValueUpdater<CacheDrawConfig> | CacheDrawConfig) {
        this.configs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.configs) : valOrUpdater;
        return this;
    }

    protected _drawFunc(context: AbstractContext2D, prefs: CacheDrawConfig) {
        const anchorRerativeLoc = new Vec2(
            prefs.anchor.x * prefs.scale.x,
            prefs.anchor.y * prefs.scale.y
        );
        const startPoint = prefs.globalLocation.sub(anchorRerativeLoc);

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
        context.drawImage(this.context.getCanvas(), startPoint, prefs.scale);
    }

    public drawFunc(context: AbstractContext2D) {
        this._drawFunc(context, this.configs);
    }

    public drawZoomFunc(context: AbstractContext2D, contextAux: AbstractContext2D, zoom: number) {
        this._drawFunc(context, {
            ...this.configs,
            scale: this.configs.scale.times(zoom),
            globalLocation: this.configs.globalLocation.times(zoom),
            shadowBlur: this.configs.shadowBlur ? this.configs.shadowBlur * zoom : null,
        });
    }
}
