import { Interpolation, Theme } from '@emotion/react';
import { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>;
};

const Container = ({ css, ...props }: ContainerProps) => {
    return (
        <div
            css={[{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content'
            }, css]}
            {...props}
        />
    )
}

export default Container;