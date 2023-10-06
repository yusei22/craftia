import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';

const ArtboardResolutionAtom = atom<[number, number]>({
    key: AtomKeys.ARTBOARD_RESOLUTION_ATOM,
    default: [1, 1],
});

export { ArtboardResolutionAtom };
