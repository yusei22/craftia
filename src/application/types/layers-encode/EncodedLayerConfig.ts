import { AtLeastArray } from "../../types"
type EncodedLayerSettings = {
    name: string;
    globalLocation: AtLeastArray<2, number>;
    visible: boolean;
    blendMode: GlobalCompositeOperation;
    opacity: number;
    shadow: {
        color: AtLeastArray<4, number>;
        shadowOffset: AtLeastArray<2, number>;
        shadowBlur: number;
    } | null;
}
type EncodedLayerMaskingSettings = {
    imageData: string,
    opacity: number
} | null
type EncodedLayerBody = {
    imageData: string,
    type: 'smart-object' | 'rasterized',
    masking: EncodedLayerMaskingSettings,
    resize: AtLeastArray<2, number>;
}
type EncodedLayer = EncodedLayerBody & EncodedLayerSettings

export type { EncodedLayerSettings, EncodedLayerMaskingSettings, EncodedLayerBody, EncodedLayer }