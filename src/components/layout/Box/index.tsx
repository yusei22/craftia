import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';

type ContainerProps = {
    width?: string | number;
    height?: string | number;
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Box = ({ css, ...props }: ContainerProps) => {
    return (
        <div
            css={[
                {
                    width: props.width,
                    height: props.height,
                },
                css,
            ]}
            {...props}
        />
    );
};

export default Box;
