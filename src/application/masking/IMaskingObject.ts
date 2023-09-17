import { StaticMaskingObject } from './StaticMaskingObject';
import { MaskingPrefs } from 'application/preferences/masking/MaskingPrefs';

type MaskingImageSource = HTMLCanvasElement | OffscreenCanvas | ImageBitmap;

interface IMaskingObject {
    readonly preferences: MaskingPrefs;
    readonly source: MaskingImageSource;
    readonly toStatic: () => Promise<StaticMaskingObject>;
}

export type { IMaskingObject, MaskingImageSource };
