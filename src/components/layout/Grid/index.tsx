import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';

type GridProps = {
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Grid = ({ css, ...props }: GridProps) => {
    return (
        <div
            css={[
                {
                    display: 'grid',
                },
                css,
            ]}
            {...props}
        />
    );
};

export default Grid;
