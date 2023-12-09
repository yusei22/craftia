import { ClassAttributes, HTMLAttributes, forwardRef } from 'react';

export type CheckerBoardProps = HTMLAttributes<HTMLDivElement> & ClassAttributes<HTMLDivElement>;

export const CheckerBoard = forwardRef<HTMLDivElement, CheckerBoardProps>(({ ...props }, ref) => {// eslint-disable-line
    return (
        <div
            ref={ref}
            css={(theme) => ({
                position: 'relative',
                width: 'fit-content',
                height: 'fit-content',
                margin: '0px',
                padding: '0px',
                fontSize: '0px',
                background: `
                repeating-conic-gradient(
                    ${theme.colors.neutral300} 0% 25%, ${theme.colors.neutral100} 0% 50%
                ) 50% / 15px 15px`,
            })}
            {...props}
        ></div>
    );
});
