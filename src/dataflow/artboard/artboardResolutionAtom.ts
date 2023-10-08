import { atom } from 'recoil';

const artboardResolutionAtom = atom<[number, number]>({
    key: 'artboardResolutionAtom',
    default: [1, 1],
});
export { artboardResolutionAtom };
