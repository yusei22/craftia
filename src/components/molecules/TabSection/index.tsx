import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, HTMLAttributes } from 'react';
import Container from 'components/layout/Container';
import { MQ } from 'mediaQuery';

type TabSectionProps = {
    css?: Interpolation<Theme>;
} & HTMLAttributes<HTMLDivElement> &
    ClassAttributes<HTMLDivElement>;

export const TabSection = ({ css, ...props }: TabSectionProps) => {
    return (
        <Container
            css={[
                (theme) => ({
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingLeft: '10px',
                    marginRight: '10px',
                    marginTop: '10px',
                    paddingBottom: '10px',
                    border: 'none',
                    [MQ.md]: {
                        border: 'none',
                        borderLeft: `1px solid ${theme.colors.neutralBright}`,
                    },
                }),
                css,
            ]}
            {...props}
        />
    );
};
