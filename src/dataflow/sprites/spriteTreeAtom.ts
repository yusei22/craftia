import { HISTORY_STORAGE_LENGTH } from 'consts';
import { useSpriteTreeUndoRedo } from 'hooks/undo-reno/useSpriteTreeUndoReno';

const {
    currentState: spriteTreeAtom,
    useSaver: useSpriteTreeSaver,
    useUndo: useSpriteTreeUndo,
    useReno: useSpriteTreeReno,
    useHistFutureVal: useSpriteTreeHistFutureVal,
    useHistPastVal: useSpriteTreeHistPastVal,
    useHistPresentVal: useSpriteTreeHistPresentVal,
} = useSpriteTreeUndoRedo({
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
