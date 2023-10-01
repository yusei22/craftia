import { atom } from 'recoil';

const ArtboardRotateState = atom<number>({
    key: 'artboardRotateState',
    default: 0 / 180 * Math.PI
});

export { ArtboardRotateState };
