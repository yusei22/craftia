import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';

type GridProps = {
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

const Grid = ({ ...props }: GridProps) => {
    return (
        <div
            css={{
                display: 'grid',
            }}
            {...props}
        />
    );
};

export default Grid;
