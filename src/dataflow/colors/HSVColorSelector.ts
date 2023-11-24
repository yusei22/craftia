import { hsvaToRgba, rgbaToHsva } from '@uiw/color-convert';
import { DefaultValue, selector } from 'recoil';
import { RGBColorAtom } from './RGBColorAtom';

export type HSV = {
    readonly h: number;
    readonly s: number;
    readonly v: number;
};

export const HSVColorSelector = selector<HSV>({
    key: 'HSVColorSelector',
    get: ({ get }) => {
        return rgbaToHsva({
            ...get(RGBColorAtom),
            a: 1.0,
        });
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        set(RGBColorAtom, hsvaToRgba({ ...newValue, a: 1.0 }));
    },
});
