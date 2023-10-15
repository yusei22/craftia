import Button from 'components/atoms/Button';
import { useSpriteTreeUndo } from 'dataflow';
export const UndoButton = () => {
    const undo = useSpriteTreeUndo();
    return <Button onClick={undo}>元に戻す</Button>;
};
