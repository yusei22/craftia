import { atom } from 'recoil';

export const layerSectionVisibilityAtom = atom<boolean>({
    key: 'layerSectionVisibilityAtom',
    default: true,
});
