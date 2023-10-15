import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes } from 'react';
import { Vec2 } from 'application/core/units';
type DiagonalLineProps = {
    start: Vec2;
    end: Vec2;
    borderWidth?: number;
    color?: string;
    css?: Interpolation<Theme>;
} & ClassAttributes<HTMLInputElement>;

const DiagonalLine = ({ start, end, css, borderWidth = 5, color, ...props }: DiagonalLineProps) => {
    const _start = start.sub(new Vec2(0, borderWidth / 2));
    const _end = end.sub(new Vec2(0, borderWidth / 2));

    const width = Math.sqrt((_end.x - _start.x) ** 2 + (_end.y - _start.y) ** 2);
    const angle = Math.atan2(_end.y - _start.y, _end.x - _start.x) * (180 / Math.PI);

    const lineStyle: Interpolation<Theme> = (theme) => ({
        position: 'absolute',
        width: `${width}px`,
        height: borderWidth,
        backgroundColor: color ?? theme.colors.primaryMedium,
        transformOrigin: `0 50%`,
        transform: `translate(${_start.x}px, ${_start.y}px) rotate(${angle}deg)`,
    });
    return <div css={[css, lineStyle]} {...props}></div>;
};

export default DiagonalLine;
