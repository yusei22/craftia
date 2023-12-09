import { BaseSprite, BaseSpritePrefs } from './BaseSprite';
import { CacheDrawConfig } from './Cache';
import { AbstractContext2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export interface BaseImageDrawConfig extends BaseSpritePrefs {
    readonly scale: Vec2;
    readonly rotation: number;
}

export class BaseImage extends BaseSprite {
    readonly configs: BaseImageDrawConfig;
    readonly source: CanvasImageSource;

    constructor(source: CanvasImageSource, configs: BaseImageDrawConfig) {
        super();
        this.configs = configs;
        this.source = source;
    }

    protected _drawFunc(context: AbstractContext2D, configs: BaseImageDrawConfig) {
        const anchorRerativeLoc = new Vec2(
            configs.anchor.x * configs.scale.x,
            configs.anchor.y * configs.scale.y
        );
        const startPoint = configs.globalLocation.sub(anchorRerativeLoc);

        this.setconfig(context, {
            line: null,
            shadow: {
                shadowBlur: configs.shadowBlur,
                shadowColor: configs.shadowColor,
                shadowOffset: configs.shadowOffset,
            },
            text: null,
            fillStyle: null,
            globalAlpha: configs.opacity,
            globalCompositeOperation: configs.blendMode,
            strokeStyle: null,
        });

        context.translate(configs.globalLocation);
        context.rotate(configs.rotation);
        context.translate(configs.globalLocation.times(-1));
        context.drawImage(this.source, startPoint, configs.scale);
    }
    public setSouce(newVal: CanvasImageSource) {
        return new BaseImage(newVal, this.configs);
    }
    public setConfigs(valOrUpdater: ValueUpdater<CacheDrawConfig> | CacheDrawConfig) {
        const configs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.configs) : valOrUpdater;
        return new BaseImage(this.source, configs);
    }

    public drawFunc(context: AbstractContext2D): void {
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
