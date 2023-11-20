import { FillLinerGradient, FillPattern, FillRadialGradient, FillSolid } from './SpriteFill';
import {
    AbstractContext2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
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
 * ベーススプライトの環境設定
 */
export interface BaseSpritePrefs {
    readonly [key: string]: SpritePrefsValue;

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

export abstract class BaseSprite {
    /**
     * contextのプロパティをセット
     * @param context ターゲットのcontext
     */
    protected setconfig(context: AbstractContext2D, config: SpriteConfig) {
        context
            .setLineConfig(config.line)
            .setShadowConfig(config.shadow)
            .setTextConfig(config.text)
            .setGlobalAlpha(config.globalAlpha)
            .setGlobalCompositeOperation(config.globalCompositeOperation)
            .setFillStyle(
                config.fillStyle === null ? null : config.fillStyle.createCanvasFillStyle(context)
            )
            .setStrokeStyle(
                config.strokeStyle === null
                    ? null
                    : config.strokeStyle.createCanvasFillStyle(context)
            );
    }
    /**
     * スプライトを描画
     * @param context ターゲットのContext2D
     * @returns
     */
    public draw(context: AbstractContext2D, contextAux: AbstractContext2D) {
        context.resetTransform();
        this.drawFunc(context, contextAux);
    }

    /**
     * 描画時のスプライト固有の描画処理
     * @param context ターゲットのContext2D
     */
    protected abstract drawFunc(context: AbstractContext2D, contextAux: AbstractContext2D): void;

    /**
     * 拡大縮小して描画するときのスプライト固有の描画処理
     * @param context ターゲットのContext2D
     * @param zoom 拡大縮小率
     */
    protected abstract drawZoomFunc(
        context: AbstractContext2D,
        contextAux: AbstractContext2D,
        zoom: number
    ): void;

    /**
     * 拡大縮小してスプライトを描画
     * @param context ターゲットのContext2D
     * @param zoom 拡大縮小率
     * @returns
     */
    public drawZoom(context: AbstractContext2D, contextAux: AbstractContext2D, zoom: number) {
        context.resetTransform();
        this.drawZoomFunc(context, contextAux, zoom);
    }
}
