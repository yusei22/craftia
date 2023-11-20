import { BaseSprite, BaseSpritePrefs } from './BaseSprite';
import { Rasterizedmage } from './RasterizedImage';
import { SmartImage } from './SmartImage';
import { FillLinerGradient, FillPattern, FillRadialGradient, FillSolid } from './SpriteFill';
import { Arc, Rect } from './shapes';
import {
    AbstractContext2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';

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
 * スプライトの環境設定
 */
export interface SpritePrefs extends BaseSpritePrefs {
    /**id */
    readonly id: string;
    /**名前 */
    readonly name: string;
}

/**
 * 抽象クラス`Sprite`
 * ターゲットのContext2Dに対する描画処理の内容を提供
 */
export abstract class Sprite<T extends SpritePrefs = SpritePrefs> extends BaseSprite {
    public readonly prefs: T;
    constructor(prefs: T) {
        super();
        this.prefs = prefs;
    }
    /**
     * スプライト環境設定をセットする
     * @param valOrUpdater 更新関数または新規スプライト環境設定
     * @returns 新しいスプライト
     */
    public abstract setSpritePrefs(
        valOrUpdater: SpritePrefsUpdater<SpritePrefs> | SpritePrefs
    ): Sprite<T>;

    /**
     * 静的スプライトを得る
     */
    public abstract createStatic(): Promise<StaticSprite>;

    public draw(context: AbstractContext2D, contextAux: AbstractContext2D): void {
        if (!this.prefs.visible) return;

        super.draw(context, contextAux);
    }

    public drawZoom(context: AbstractContext2D, contextAux: AbstractContext2D, zoom: number): void {
        if (!this.prefs.visible) return;

        super.drawZoom(context, contextAux, zoom);
    }
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
