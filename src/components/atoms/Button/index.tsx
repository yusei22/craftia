import { Theme, FunctionInterpolation } from '@emotion/react';
import { ClassAttributes } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'danger'
    | 'warn'
    | 'netural'
    | 'transparent'
    | 'translucent'
    | 'secondary';

export type ButtonProps = {
    variant?: ButtonVariant;
} & ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: {
    [key in ButtonVariant]: FunctionInterpolation<Theme>;
} = {
    primary: (theme) => ({
        fontSize: theme.fontSize.sm,
        border: 'none',
        padding: '5px 10px',
        transition: '0.1s',
        backgroundColor: theme.colors.primary600,
        color: theme.colors.white,
        borderRadius: 5,
        ':hover': {
            backgroundColor: theme.colors.primary700,
        },
        ':active': {
            backgroundColor: theme.colors.primary600,
        },
    }),
    secondary: (theme) => ({
        fontSize: theme.fontSize.sm,
        padding: '5px 10px',
        transition: '0.1s',

        backgroundColor: '#0000',
        borderRadius: 5,
        border: `1px solid ${theme.colors.neutral300}`,
        color: theme.colors.primary700,
        ':hover': {
            backgroundColor: theme.colors.translucentPale,
        },
        ':active': {
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
