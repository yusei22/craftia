import Wrapper from 'components/layout/Wrapper';
import { useSpriteTreeUndo } from 'dataflow';

export type UndoButtonProps = {
    children?: React.ReactNode;
    className?: string;
};

export const UndoButton = ({ children, className }: UndoButtonProps) => {
    const undo = useSpriteTreeUndo();
    return (
        <Wrapper onClick={undo} className={className}>
            {children}
        </Wrapper>
    );
};
