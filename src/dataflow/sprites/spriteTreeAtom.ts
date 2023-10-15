import { HISTORY_STORAGE_LENGTH } from 'consts';
import { createSpriteTreeUndoRedo } from 'hooks/undo-reno/createSpriteTreeUndoReno';

const {
    currentState: spriteTreeAtom,
    useSaver: useSpriteTreeSaver,
    useUndo: useSpriteTreeUndo,
    useReno: useSpriteTreeReno,
    useHistFutureVal: useSpriteTreeHistFutureVal,
    useHistPastVal: useSpriteTreeHistPastVal,
    useHistPresentVal: useSpriteTreeHistPresentVal,
} = createSpriteTreeUndoRedo({                 // eslint-disable-line
    histPastKey: 'spriteTreeHistPast',
    histPresentKey: 'spriteTreeHistPresent',
    histFutureKey: 'spriteTreeHistFuture',
    currentKey: 'spriteTreeCurrent',
    defualt: [],
    storageLength: HISTORY_STORAGE_LENGTH,
});

export {
    spriteTreeAtom,
    useSpriteTreeSaver,
    useSpriteTreeUndo,
    useSpriteTreeReno,
    useSpriteTreeHistFutureVal,
    useSpriteTreeHistPastVal,
    useSpriteTreeHistPresentVal,
};
