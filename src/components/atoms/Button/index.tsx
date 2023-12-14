import { Theme, FunctionInterpolation } from '@emotion/react';
import { ClassAttributes } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'danger'
    | 'warn'
    | 'netural'
    | 'transparent'
    | 'translucent';

export type ButtonProps = {
    variant?: ButtonVariant;
} & ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: {
    [key in ButtonVariant]: FunctionInterpolation<Theme>;
} = {
    primary: (theme) => ({
        color: theme.colors.text,
        backgroundColor: theme.colors.primary200,
        fontSize: theme.fontSize.md,
        border: `1px solid #0000`,
        padding: '4px 13px',
        ':hover': {
            backgroundColor: theme.colors.primary200,
        },
        ':active': {
            border: `1px solid ${theme.colors.primary300}`,
            backgroundColor: theme.colors.primary200,
        },
    }),
    danger: (theme) => ({
        color: theme.colors.danger700,
        backgroundColor: theme.colors.danger100,
        fontSize: theme.fontSize.md,
        padding: '5px 10px',
        border: 'none',
        ':active': {
            backgroundColor: theme.colors.danger300,
        },
    }),
    warn: (theme) => ({
        color: theme.colors.warn700,
        backgroundColor: theme.colors.warn100,
        fontSize: theme.fontSize.md,
        padding: '5px 10px',
        border: 'none',

        ':active': {
            backgroundColor: theme.colors.warn300,
        },
    }),
    netural: (theme) => ({
        color: theme.colors.neutral700,
        backgroundColor: theme.colors.neutral100,
        fontSize: theme.fontSize.md,
        padding: '5px 10px',
        border: `1px solid #0000`,
        ':hover': {
            backgroundColor: theme.colors.neutral200,
        },
        ':active': {
            border: `1px solid ${theme.colors.neutral300}`,
            backgroundColor: theme.colors.neutral200,
        },
    }),
    transparent: (theme) => ({
        color: theme.colors.text,
        backgroundColor: '#0000',
        fontSize: theme.fontSize.md,
        padding: '5px 10px',
        border: 'none',
    }),
    translucent: (theme) => ({
        color: theme.colors.text,
        backgroundColor: ' #0000',
        fontSize: theme.fontSize.md,
        padding: '5px 10px',
        border: 'none',
        ':hover': {
            backgroundColor: theme.colors.translucentPale,
        },
        ':active': {
            backgroundColor: theme.colors.translucentMedium,
        },
    }),
};

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    return <button {...props} css={variants[variant]}></button>;
};

export default Button;
