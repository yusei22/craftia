import { atom } from 'recoil';

export const activeSpriteIdsAtom = atom<string[]>({
    key: 'activeSpriteIdAtom',
    default: [],
});
