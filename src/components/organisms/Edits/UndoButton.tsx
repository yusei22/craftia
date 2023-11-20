import Button from 'components/atoms/Button';
import { useSpriteTreeUndo } from 'dataflow';
export const UndoButton = () => {
    const undo = useSpriteTreeUndo();
    return (
        <Button onClick={undo} variant="translucent">
            元に戻す
        </Button>
    );
};
