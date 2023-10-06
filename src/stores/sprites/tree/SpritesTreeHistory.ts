import { createUndoRedo } from 'hooks';
import { Sprite } from 'application/sprites/Sprite';
import { AtomKeys } from 'stores/recoilKeys';

const SpriteTreeHistory = createUndoRedo<Sprite[]>({
    pastKey: AtomKeys.SPRITE_TREEHISTORY_PAST,
    currentKey: AtomKeys.SPRITE_TREEHISTORY_CURRENT,
    futureKey: AtomKeys.SPRITE_TREEHISTORY_FUTURE,
    defualt: [],
    storageLength: 20,
});

export { SpriteTreeHistory };