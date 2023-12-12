import { Interpolation, Theme } from '@emotion/react';
import { PenBlendModeField } from './BlendMode';
import { PenOpacityField } from './Opacity';
import { PenRealTimeStabilizationField } from './RealTimeStabilization';
import { PenSizeField } from './Size';
import { PenStabilizationField } from './Stabilization';
import Container from 'components/layout/Container';

const css: Interpolation<Theme> = {
    margin: '1px 5px',
};

export const PenMenues = () => {
    return (
        <Container
            css={{
                alignItems: 'center',
            }}
        >
            <PenBlendModeField css={css} />
            <PenSizeField css={css} />
            <PenOpacityField css={css} />
            <PenRealTimeStabilizationField css={css} />
            <PenStabilizationField css={css} />
        </Container>
    );
};
