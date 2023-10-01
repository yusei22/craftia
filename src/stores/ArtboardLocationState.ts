import { atom } from 'recoil';

const ArtboardLocationState = atom<[number, number]>({
    key: 'artboardLocationState',
    default: [0, 0],
});
export { ArtboardLocationState };
