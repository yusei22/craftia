import { atom } from 'recoil';

const RenderViewSizeState = atom<[number, number]>({
    key: 'renderViewSizeState',
    default: [1, 1],
});

export { RenderViewSizeState };
