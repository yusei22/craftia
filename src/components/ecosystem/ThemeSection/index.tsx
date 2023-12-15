import { Interpolation, Theme } from '@emotion/react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from 'components/atoms/IconButton';
import Container from 'components/layout/Container';
import { ThemeButton } from 'components/organisms/Displays/ThemeButton';

export type ThemeSectionProps = {
    className?: string;
};

const IconCss: Interpolation<Theme> = (theme) => ({
    fontSize: theme.fontSize.md2,
});

export const ThemeSection = ({ className }: ThemeSectionProps) => {
    return (
        <Container className={className}>
            <ThemeButton
                css={{
                    marginRight: 10,
                }}
            >
                <IconButton variant="translucent">
                    <Brightness7Icon css={IconCss} />
                </IconButton>
            </ThemeButton>
        </Container>
    );
};
