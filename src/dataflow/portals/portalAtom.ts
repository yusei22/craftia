import { atom } from 'recoil';
export const portalAtom = atom<null | HTMLDivElement>({
    key: 'portalAtom',
    default: null,
});
