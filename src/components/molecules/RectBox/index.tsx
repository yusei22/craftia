import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes } from 'react';
import { Vec2 } from 'application/core/units';
import Circle from 'components/atoms/Circle';
import DiagonalLine from 'components/atoms/DiagonalLine';
import Wrapper from 'components/layout/Wrapper';

type RectBoxProps = {
    topLeft: Vec2;
    topRight: Vec2;
    bottomLeft: Vec2;
    bottomRight: Vec2;
    borderWidth?: number;
    resizeCursor?: boolean;
    cornerRadius?: Vec2;
    cornerCss?: Interpolation<Theme>;
};

type CornerCircleProps = {
    location: Vec2;
    radius: Vec2;
    css?: Interpolation<Theme>;
} & ClassAttributes<HTMLDivElement>;

const CornerCircle = ({ location, radius, ...props }: CornerCircleProps) => {
    return <Circle location={location.sub(radius)} radius={radius} {...props} />;
};

const RectBox = ({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    cornerRadius = new Vec2(5, 5),
    borderWidth = 3,
    cornerCss,
    resizeCursor: resize,
}: RectBoxProps) => {
    return (
        <>
            <Wrapper>
                <DiagonalLine start={topLeft} end={topRight} borderWidth={borderWidth} />
                <DiagonalLine start={topLeft} end={bottomLeft} borderWidth={borderWidth} />
                <DiagonalLine start={bottomLeft} end={bottomRight} borderWidth={borderWidth} />
                <DiagonalLine start={topRight} end={bottomRight} borderWidth={borderWidth} />
                <CornerCircle
                    location={topLeft}
                    radius={cornerRadius}
                    css={[
                        cornerCss,
                        {
                            cursor: resize ? 'nwse-resize' : 'auto',
                        },
                    ]}
                />
                <CornerCircle
                    location={topRight}
                    radius={cornerRadius}
                    css={[
                        cornerCss,
                        {
                            cursor: resize ? 'nesw-resize' : 'auto',
                        },
                    ]}
                />
                <CornerCircle
                    location={bottomLeft}
                    radius={cornerRadius}
                    css={[
                        cornerCss,
                        {
                            cursor: resize ? 'nesw-resize' : 'auto',
                        },
                    ]}
                />
                <CornerCircle
                    location={bottomRight}
                    radius={cornerRadius}
                    css={[
                        cornerCss,
                        {
                            cursor: resize ? 'nwse-resize' : 'auto',
                        },
                    ]}
                />
            </Wrapper>
        </>
    );
};
export default RectBox;
