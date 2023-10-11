import { atom } from 'recoil';
import { Vec2 } from 'application/core/units';

const artboardResolutionAtom = atom<Vec2>({
    key: 'artboardResolutionAtom',
    default: new Vec2(1, 1),
});
export { artboardResolutionAtom };
