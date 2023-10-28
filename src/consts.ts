import { BlendMode } from 'types';

export const WHEEL_CLOSE_UP_DEGREES = 0.1;

export const HISTORY_STORAGE_LENGTH = 20;

export const MAX_PEN_WIDTH = 200;
export const MIN_PEN_WIDTH = 1;

export const MIN_PEN_OPACITY = 0;
export const MAX_PEN_OPACITY = 1.0;

export const MIN_PEN_Stabilization = 0;
export const MAX_PEN_Stabilization = 40;

export const MAX_CONVOLUTION_RADIUS = 50;
export const MIN_CONVOLUTION_RADIUS = 0.5;

export const BLEND_MODE_LABEL: {
    [K in BlendMode]: string;
} = {
    'source-over': 'ノーマル',
    'source-atop': 'source-atop',
    'source-in': 'source-in',
    'source-out': 'source-out',
    lighter: 'ライター',
    xor: '交差',
    multiply: '乗算',
    screen: 'スクリーン',
    overlay: 'オーバーレイ',
    darken: '暗くする',
    lighten: '明るくする',
    'color-dodge': '覆い焼き',
    'color-burn': '焼き込み',
    'hard-light': 'ハードライト',
    'soft-light': 'ソフトライト',
    difference: '差',
    exclusion: '除外',
    'destination-atop': 'destination-atop',
    'destination-in': 'destination-in',
    'destination-out': '消しゴム',
    hue: '色相',
    saturation: '彩度',
    color: 'カラー',
    luminosity: '輝度',
} as const;

export const PEN_BLEND_MODE_VALUE: ReadonlyArray<BlendMode> = [
    'source-over',
    'lighter',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'destination-out',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export const LAYER_BLEND_MODE_VALUE: ReadonlyArray<BlendMode> = [
    'source-over',
    'lighter',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export const MAX_UNSHARPMASKING_THRESHOLD = 5.0;
export const MIN_UNSHARPMASKING_THRESHOLD = 0.1;
