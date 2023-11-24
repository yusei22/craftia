import { Theme, FunctionInterpolation } from '@emotion/react';
import { ClassAttributes } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'danger'
    | 'translucent'
    | 'warn'
    | 'netural'
    | 'translucentDark';

export type ButtonProps = {
    variant?: ButtonVariant;
} & ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: {
    [key in ButtonVariant]: FunctionInterpolation<Theme>;
} = {
    primary: (theme) => ({
        color: theme.colors.text,
        backgroundColor: theme.colors.primary100,
        fontSize: theme.fontSize.md,
        border: 'none',
        padding: '6px 16px',

        ':active': {
            backgroundColor: theme.colors.primary200,
        },
    }),
    danger: (theme) => ({
        color: theme.colors.danger700,
        backgroundColor: theme.colors.danger100,
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',

        ':active': {
            backgroundColor: theme.colors.danger300,
        },
    }),
    warn: (theme) => ({
        color: theme.colors.warn700,
        backgroundColor: theme.colors.warn100,
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',

        ':active': {
            backgroundColor: theme.colors.warn300,
        },
    }),
    translucent: (theme) => ({
        color: theme.colors.text,
        backgroundColor: 'rgba(255,255,255,0)',
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',
        ':hover': {
            backgroundColor: theme.colors.translucentPale,
        },
        ':active': {
            backgroundColor: theme.colors.translucentMedium,
        },
    }),
    netural: (theme) => ({
        color: theme.colors.neutral700,
        backgroundColor: 'rgba(255,255,255,0)',
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',
        ':hover': {
            backgroundColor: theme.colors.neutral100,
        },
        ':active': {
            backgroundColor: theme.colors.neutral300,
        },
    }),
    translucentDark: (theme) => ({
        color: theme.colors.text,
        backgroundColor: theme.colors.translucentMedium,
        fontSize: theme.fontSize.md,
        padding: '6px 16px',
        border: 'none',
        ':hover': {
            backgroundColor: theme.colors.translucentMedium,
        },
        ':active': {
            backgroundColor: theme.colors.translucentDeep,
        },
    }),
};

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    return <button {...props} css={variants[variant]}></button>;
};

export default Button;
