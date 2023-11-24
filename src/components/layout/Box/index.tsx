import { ClassAttributes, HTMLAttributes } from 'react';

export type BoxProps = {
    width?: string | number;
    height?: string | number;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Box = ({ ...props }: BoxProps) => {
    return (
        <div
            css={{
                width: props.width,
                height: props.height,
            }}
            {...props}
        />
    );
};

export default Box;
