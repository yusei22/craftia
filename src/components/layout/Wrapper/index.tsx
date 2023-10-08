import { Interpolation, Theme } from '@emotion/react';
import { HTMLAttributes, forwardRef } from 'react';

type WrapperProps = HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>;
};

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ css, ...props }, ref) => {
    return (
        <div
            ref={ref}
            css={[{
                position: 'relative',
                width: 'fit-content',
                margin: '0px',
                padding: '0px',
                fontSize: '0px',
            }, css]}
            {...props}
        ></div>
    );
});
export default Wrapper;
