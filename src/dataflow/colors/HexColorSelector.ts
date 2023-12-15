import { hexToRgba, rgbaToHex } from '@uiw/color-convert';
import { DefaultValue, selector } from 'recoil';
import { RGBColorAtom } from './RGBColorAtom';

export const HexColorSelector = selector<string>({
    key: 'HexColorSelector',
    get: ({ get }) => {
        return rgbaToHex({
            ...get(RGBColorAtom),
            a: 1.0,
        });
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        try {
            set(RGBColorAtom, hexToRgba(newValue));
        } catch {
            return;
        }
    },
});
