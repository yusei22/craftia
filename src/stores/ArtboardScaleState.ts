import { atom } from 'recoil';

const ArtboardScaleState = atom<[number, number]>({
    key: 'artboardRotateState',
    default: [1, 1],
});
export { ArtboardScaleState };
