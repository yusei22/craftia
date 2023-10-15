import { Rasterizedmage } from './RasterizedImage';
import { Shape } from './Shape';
import { SmartImage } from './SmartImage';
import { FillLinerGradient, FillPattern, FillRadialGradient, FillSolid } from './SpriteFill';
import {
    Context2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec, Vec2 } from 'application/core/units';

export type SpriteFillStyle =
    | null
    | FillLinerGradient
    | FillRadialGradient
    | FillPattern
    | FillSolid;

export interface SpriteConfig {
    readonly line: ContextLineConfig | null;
    readonly shadow: ContextShadowConfig | null;
    readonly text: ContextTextConfig | null;
    readonly fillStyle: SpriteFillStyle;
    readonly globalAlpha: number | null;
    readonly globalCompositeOperation: GlobalCompositeOperation | null;
    readonly strokeStyle: SpriteFillStyle;
}

export type SpritePrefsValue = undefined | string | number | boolean | null | Vec | SpriteFillStyle;

export interface SpritePrefs {
    readonly [key: string]: SpritePrefsValue;
    /**id */
    readonly id: string;
    /**名前 */
    readonly name: string;
    /**基準点 */
    readonly anchor: Vec2;
    /**グローバル位置 */
    readonly globalLocation: Vec2;
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
export type SpritePrefsUpdater<T extends SpritePrefs> = ValueUpdater<T>;

export abstract class Sprite<T extends SpritePrefs = SpritePrefs> {
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
    abstract setPrefs(valOrUpdater: ValueUpdater<T> | T): Sprite<T>;
    abstract getStartPoint(): Vec2;
    abstract createStatic(): Promise<StaticSprite>;
}

export type StaticSprite = Rasterizedmage | SmartImage | Shape<any>;// eslint-disable-line

export function searchSpriteFromID(sprites: Sprite[], id: string): [Sprite | null, number | null] {
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].prefs.id === id) return [sprites[i], i];
    }
    return [null, null];
}

export function searchSpritesFromIDs(sprites: Sprite[], ids: string[]) {
    const hitSprites: Sprite[] = [];
    for (let i = 0; i < sprites.length; i++) {
        for (let j = 0; j < ids.length; j++) {
            if (sprites[i].prefs.id === ids[j]) {
                hitSprites.push(sprites[i]);
            }
        }
    }
    return hitSprites;
}
