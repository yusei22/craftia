import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';

const ArtboardLocationAtom = atom<[number, number]>({
    key: AtomKeys.ARTBOARD_LOCATION_ATOM,
    default: [0, 0],
});
export { ArtboardLocationAtom };
