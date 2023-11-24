import { Interpolation, Theme } from '@emotion/react';
import Button from 'components/atoms/Button';
import IconButton from 'components/atoms/IconButton';
import { MQ } from 'mediaQuery';

const tabButtonCss: Interpolation<Theme> = (theme) => ({
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary900,
    padding: '4px 13px',
    borderRadius: 0,
    ':active': {
        backgroundColor: theme.colors.translucentPale,
    },
});

type TabButtonProps = {
    icon: React.ReactNode;
    text: string;
    isAcrive?: boolean;
};

export const TabButton = ({ icon, text, isAcrive }: TabButtonProps) => {
    return (
        <>
            <Button
                css={[
                    tabButtonCss,
                    (theme) => ({
                        display: 'none',
                        borderBottom: isAcrive
                            ? `2px solid ${theme.colors.primary400}`
                            : `2px solid #0000`,
                        height: '30px',
                        [MQ.md]: {
                            display: 'block',
                        },
                    }),
                ]}
                variant="translucent"
            >
                {text}
            </Button>
            <IconButton
                css={[
                    tabButtonCss,
                    (theme) => ({
                        display: 'block',
                        borderBottom: isAcrive
                            ? `2px solid ${theme.colors.primary400}`
                            : `2px solid #0000`,
                        height: '30px',
                        [MQ.md]: {
                            display: 'none',
                        },
                    }),
                ]}
                variant="translucent"
            >
                {icon}
            </IconButton>
        </>
    );
};
