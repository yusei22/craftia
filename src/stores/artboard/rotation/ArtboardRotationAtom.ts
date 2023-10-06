import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';

const ArtboardRotationAtom = atom<number>({
    key: AtomKeys.ARTBOARD_ROTATE_ATOM,
    default: 0 / 180 * Math.PI
});

export { ArtboardRotationAtom };
