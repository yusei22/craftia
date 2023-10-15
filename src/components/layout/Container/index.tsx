import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';

type ContainerProps = {
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Container = ({ css, ...props }: ContainerProps) => {
    return (
        <div
            css={[
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'fit-content',
                },
                css,
            ]}
            {...props}
        />
    );
};

export default Container;
