import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';

const RenderViewScaleAtom = atom<[number, number]>({
    key: AtomKeys.RENDERVIEW_SCALE_ATOM,
    default: [1, 1],
});

export { RenderViewScaleAtom };
