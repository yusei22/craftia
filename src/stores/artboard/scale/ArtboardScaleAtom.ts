import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';
const ArtboardScaleAtom = atom<[number, number]>({
    key: AtomKeys.ARTBOARD_SCALE_ATOM,
    default: [1, 1],
});
export { ArtboardScaleAtom };
