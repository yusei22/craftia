import { atom } from 'recoil';
import { Sprite } from 'application/sprites/Sprite';
import { createUndoRedo } from 'hooks';

const SpriteTreeState = atom<Sprite[]>({
    key: 'spriteTreeState',
    default: [],
});

const SpriteTreeHistory = createUndoRedo<Sprite[]>({
    pastKey: 'spriteTreePast',
    currentKey: 'spriteTreeCurrent',
    futureKey: 'spriteTreeFuture',
    defualt: [],
    storageLength: 20,
});

export { SpriteTreeState, SpriteTreeHistory };
