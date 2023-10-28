import { Rasterizedmage } from './RasterizedImage';
import { SmartImage } from './SmartImage';
import { FillLinerGradient, FillPattern, FillRadialGradient, FillSolid } from './SpriteFill';
import { Arc, Rect } from './shapes';
import {
    Context2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec, Vec2 } from 'application/core/units';
import { BlendMode } from 'types';

/**
 * スプライトの塗りつぶし設定
 */
export type SpriteFillStyle =
    | null
    | FillLinerGradient
    | FillRadialGradient
    | FillPattern
    | FillSolid;
/**
 * contextプロパティの設定
 */
export interface SpriteConfig {
    /**線の設定 */
    readonly line: ContextLineConfig | null;
    /**影の設定 */
    readonly shadow: ContextShadowConfig | null;
    /**テキストの設定 */
    readonly text: ContextTextConfig | null;
    /**塗りつぶしの設定 */
    readonly fillStyle: SpriteFillStyle;
    /**透明度の設定 */
    readonly globalAlpha: number | null;
    /**ブレンドモードの設定 */
    readonly globalCompositeOperation: GlobalCompositeOperation | null;
    /**枠線の設定 */
    readonly strokeStyle: SpriteFillStyle;
}

/**
 * スプライト環境設定で許容されるプロパティ値
 */
export type SpritePrefsValue =
    | undefined
    | string
    | number
    | boolean
    | null
    | Vec
    | SpriteFillStyle
    | ReadonlyArray<SpritePrefsValue>;

/**
 * スプライトの環境設定
 */
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
    readonly blendMode: BlendMode;
    /**透明度 */
    readonly opacity: number;
    /**影のぼかし */
    readonly shadowBlur: number | null;
    /**影の色 */
    readonly shadowColor: string | null;
    /**影の位置 */
    readonly shadowOffset: Vec2 | null;
}
/**
 * スプライトの環境設定のアップデータ
 */
export type SpritePrefsUpdater<T extends SpritePrefs> = ValueUpdater<T>;

/**
 * スプライトツリー
 */
export type SpriteTree = Sprite[];

/**
 * 静的スプライト
 */
export type StaticSprite = Rasterizedmage | SmartImage | Arc | Rect;

/**
 * 静的スプライトツリー
 */
export type StaticSpriteTree = StaticSprite[];

/**
 * 抽象クラス`Sprite`
 * ターゲットのContext2Dに対する描画処理の内容を提供
 */
export abstract class Sprite<T extends SpritePrefs = SpritePrefs> {
    /**contextプロパティの設定 */
    readonly config: SpriteConfig;
    /**環境設定 */
    readonly prefs: T;

    /**
     * コンストラクタ
     * @param config 描画時の設定
     * @param prefs スプライトの環境設定
     */
    constructor(config: SpriteConfig, prefs: T) {
        this.config = config;
        this.prefs = prefs;
    }

    /**
     * contextのプロパティをセット
     * @param context ターゲットのcontext
     */
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

    /**
     * スプライトを描画
     * @param context ターゲットのContext2D
     * @returns
     */
    public draw(context: Context2D) {
        if (!this.prefs.visible) return;

        context.resetTransform();
        this.setconfig(context);
        this.drawFunc(context);
    }

    /**
     * 拡大縮小してスプライトを描画
     * @param context ターゲットのContext2D
     * @param zoom 拡大縮小率
     * @returns
     */
    public drawZoom(context: Context2D, zoom: number) {
        if (!this.prefs.visible) return;

        context.resetTransform();
        this.setconfig(context);
        this.drawZoomFunc(context, zoom);
    }

    /**
     * 描画時のスプライト固有の描画処理
     * @param context ターゲットのContext2D
     */
    protected abstract drawFunc(context: Context2D): void;

    /**
     * 拡大縮小して描画するときのスプライト固有の描画処理
     * @param context ターゲットのContext2D
     * @param zoom 拡大縮小率
     */
    protected abstract drawZoomFunc(context: Context2D, zoom: number): void;

    /**
     * スプライト環境設定をセットする
     * @param valOrUpdater 更新関数または新規スプライト環境設定
     * @returns 新しいスプライト
     */
    public abstract setSpritePrefs(
        valOrUpdater: SpritePrefsUpdater<SpritePrefs> | SpritePrefs
    ): Sprite<T>;

    /**
     * スプライトの始点を得る
     */
    public abstract getStartPoint(): Vec2;

    /**
     * 静的スプライトを得る
     */
    public abstract createStatic(): Promise<StaticSprite>;
}

/**
 * スプライトツリーから対象のスプライトを得る
 * @param sprites スプライトツリー
 * @param id 対象のスプライトのID
 * @returns
 */
export function searchSpriteFromID(
    sprites: SpriteTree,
    id: string
): [Sprite | null, number | null] {
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].prefs.id === id) return [sprites[i], i];
    }
    return [null, null];
}

/**
 * スプライトツリーから対象のスプライトを得る(複数)
 * @param sprites スプライトツリー
 * @param ids 対象のスプライトのIDの配列
 * @returns
 */
export function searchSpritesFromIDs(sprites: SpriteTree, ids: string[]) {
    const hitSprites: SpriteTree = [];
    for (let i = 0; i < sprites.length; i++) {
        for (let j = 0; j < ids.length; j++) {
            if (sprites[i].prefs.id === ids[j]) {
                hitSprites.push(sprites[i]);
            }
        }
    }
    return hitSprites;
}
