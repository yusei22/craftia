import { Interpolation, Theme, FunctionInterpolation } from '@emotion/react';

export type ButtonVariant = 'primary' | 'danger' | 'translucent' | 'warn';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    css?: Interpolation<Theme>;
};

const variants: {
    [key in ButtonVariant]: FunctionInterpolation<Theme>;
} = {
    primary: (theme) => ({
        color: theme.colors.primaryDark,
        backgroundColor: theme.colors.primaryBrighter,
        fontSize: theme.fontSize.md,
        border: 'none',
        padding: '6px 16px',

        ':active': {
            backgroundColor: theme.colors.primaryBright,
        },
    }),
    danger: (theme) => ({
        color: theme.colors.dangerDark,
        backgroundColor: theme.colors.dangerBrighter,
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',

        ':active': {
            backgroundColor: theme.colors.dangerBright,
        },
    }),
    warn: (theme) => ({
        color: theme.colors.warnDark,
        backgroundColor: theme.colors.warnBrighter,
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',

        ':active': {
            backgroundColor: theme.colors.warnBright,
        },
    }),
    translucent: (theme) => ({
        color: theme.colors.text,
        backgroundColor: 'rgba(255,255,255,0)',
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',
        ":hover": {
            backgroundColor: theme.colors.translucentPale,
        },
        ':active': {
            backgroundColor: theme.colors.translucentMedium,
        },
    })
};

const Button = ({ variant = 'primary', css, ...props }: ButtonProps) => {
    return (
        <button {...props} css={[variants[variant], css]}></button>
    );
};

export default Button;
