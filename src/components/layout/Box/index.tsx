import { Interpolation, Theme } from '@emotion/react';
import { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    width?: string | number,
    height?: string | number
    css?: Interpolation<Theme>;
};

const Box = ({ css, ...props }: ContainerProps) => {
    return (
        <div
            css={[{
                width: props.width,
                height: props.height
            }, css]}
            {...props}
        />
    )
}

export default Box;