import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes, forwardRef } from 'react';

type WrapperProps = {
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ css, ...props }, ref) => {
    return (
        <div
            ref={ref}
            css={[
                {
                    position: 'relative',
                    width: 'fit-content',
                    height: 'fit-content',
                    margin: '0px',
                    padding: '0px',
                    fontSize: '0px',
                },
                css,
            ]}
            {...props}
        ></div>
    );
});
export default Wrapper;
