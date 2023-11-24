import { ClassAttributes, HTMLAttributes, forwardRef } from 'react';

export type WrapperProps = HTMLAttributes<HTMLDivElement> & ClassAttributes<HTMLDivElement>;

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ ...props }, ref) => {// eslint-disable-line
    return (
        <div
            ref={ref}
            css={{
                position: 'relative',
                width: 'fit-content',
                height: 'fit-content',
                margin: '0px',
                padding: '0px',
                fontSize: '0px',
            }}
            {...props}
        ></div>
    );
});
export default Wrapper;
