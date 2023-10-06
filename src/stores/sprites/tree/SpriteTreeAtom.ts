import { atom } from 'recoil';
import { Sprite } from 'application/sprites/Sprite';
import { AtomKeys } from 'stores/recoilKeys';

const SpriteTreeAtom = atom<Sprite[]>({
    key: AtomKeys.SPRITE_TREE_ATOM,
    default: [],
});
export { SpriteTreeAtom }
