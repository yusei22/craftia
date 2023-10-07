import { atom } from 'recoil';

const renderViewScaleAtom = atom<[number, number]>({
    key: 'enderViewScaleAtom',
    default: [1, 1],
});

export { renderViewScaleAtom };