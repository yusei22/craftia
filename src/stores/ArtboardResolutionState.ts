import { atom } from 'recoil';

const ArtboardResolutionState = atom<[number, number]>({
    key: 'artboardResolutionState',
    default: [1, 1],
});

export { ArtboardResolutionState };
