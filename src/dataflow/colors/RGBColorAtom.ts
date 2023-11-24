import { atom } from 'recoil';

export type RGB = {
    readonly r: number;
    readonly g: number;
    readonly b: number;
};

export const RGBColorAtom = atom<RGB>({
    key: 'RGBColorAtom',
    default: {
        r: 255,
        g: 255,
        b: 255,
    },
});
