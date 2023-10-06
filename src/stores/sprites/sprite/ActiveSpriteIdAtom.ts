import { atom } from 'recoil';
import { AtomKeys } from 'stores/recoilKeys';

const ActiveSpriteIdAtom = atom<string[]>({
    key: AtomKeys.ACTIVE_SPRITEID_ATOM,
    default: [],
});

export { ActiveSpriteIdAtom };
