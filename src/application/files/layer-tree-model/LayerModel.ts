import { AtLeastArray } from 'application/core/types';

export type LayerMaskingPrefsModel = {
    /**画像データ先 */
    src: string;
    /**グローバル位置 */
    globalLocation: AtLeastArray<2, number>;
    /**透明度 */
    opacity: number;
} | null;

export type LayerShadowPrefsModel = {
    color: AtLeastArray<4, number>;
    shadowOffset: AtLeastArray<2, number>;
    shadowBlur: number;
} | null;

export type LayerPrefsModel = {
    /**名前 */
    name: string;
    /**グローバル位置 */
    globalLocation: AtLeastArray<2, number>;
    /**可視 */
    visible: boolean;
    /**ブレンドモード */
    blendMode: GlobalCompositeOperation;
    /**透明度 */
    opacity: number;
    /**影 */
    shadow: LayerShadowPrefsModel;
};
export type LayerModel = LayerPrefsModel & {
    /**画像データ先 */
    src: string | null;
    /**タイプ */
    type: 'smart-object' | 'rasterized';
    /**リサイズ */
    resize: AtLeastArray<2, number>;
    /**マスキング */
    masking: LayerMaskingPrefsModel;
};
