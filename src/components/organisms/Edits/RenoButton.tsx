import Wrapper from 'components/layout/Wrapper';
import { useSpriteTreeReno } from 'dataflow';

export type RenoButtonProps = {
    children?: React.ReactNode;
    className?: string;
};

export const RenoButton = ({ children, className }: RenoButtonProps) => {
    const reno = useSpriteTreeReno();
    return (
        <Wrapper onClick={reno} className={className}>
            {children}
        </Wrapper>
    );
};
