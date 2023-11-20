import { atom } from 'recoil';
import { Vec2 } from 'application/core/units';

export const stageResolutionAtom = atom<Vec2>({
    key: 'stageResolutionAtom',
    default: new Vec2(1, 1),
});
