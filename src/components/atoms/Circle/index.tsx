import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes } from 'react';
import { Vec2 } from 'application/core/units';
import Box from 'components/layout/Box';

type CircleProps = {
    location?: Vec2;
    radius?: Vec2;
    css?: Interpolation<Theme>;
} & ClassAttributes<HTMLDivElement> &
    React.ButtonHTMLAttributes<HTMLDivElement>;

const Circle = ({ location, radius, css, ...props }: CircleProps) => {
    const diameter = radius?.times(2);
    return (
        <Box
            width={diameter?.x}
            height={diameter?.y}
            css={[
                css,
                (theme) => ({
                    position: 'absolute',
                    left: location?.x,
                    top: location?.y,
                    borderRadius: '50%',
                    backgroundColor: theme.colors.primaryMedium,
                }),
            ]}
            {...props}
        />
    );
};
export default Circle;
