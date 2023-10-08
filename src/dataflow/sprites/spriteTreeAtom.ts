import { atom } from 'recoil';
import { Sprite } from 'application/sprites/Sprite';

const spriteTreeAtom = atom<Sprite[]>({
    key: 'spriteTreeAtom',
    default: [],
});
export { spriteTreeAtom };
