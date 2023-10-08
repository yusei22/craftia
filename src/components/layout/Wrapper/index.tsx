import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes, forwardRef } from 'react';

type WrapperProps = ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement> & {
        css?: Interpolation<Theme>;
    };

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>((props, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            css={{
                position: 'relative',
                width: 'fit-content',
                margin: '0px',
                padding: '0px',
                fontSize: '0px',
            }}
        ></div>
    );
});
export default Wrapper;
