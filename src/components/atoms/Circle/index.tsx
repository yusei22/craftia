import { ClassAttributes } from 'react';
import { Vec2 } from 'application/core/units';
import Box from 'components/layout/Box';

type CircleProps = {
    location?: Vec2;
    radius?: Vec2;
} & ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>;

const Circle = ({ location, radius, ...props }: CircleProps) => {
    const diameter = radius?.times(2);
    return (
        <Box
            width={diameter?.x}
            height={diameter?.y}
            css={(theme) => ({
                position: 'absolute',
                left: location?.x,
                top: location?.y,
                borderRadius: '50%',
                backgroundColor: theme.colors.primary400,
            })}
            {...props}
        />
    );
};
export default Circle;
