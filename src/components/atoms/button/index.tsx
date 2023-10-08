import { Interpolation, Theme, FunctionInterpolation } from '@emotion/react';

export type ButtonVariant = 'primary' | 'danger';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: ButtonVariant;
    css?: Interpolation<Theme>;
};

const variants: {
    [key in ButtonVariant]: FunctionInterpolation<Theme>;
} = {
    primary: (theme) => ({
        color: theme.colors.primaryDark,
        backgroundColor: theme.colors.primaryLight,
        border: 'none',

        ':hover': {
            backgroundColor: theme.colors.primary,
        },
        ':disabled': {
            backgroundColor: theme.colors.primary,
        },
    }),
    danger: (theme) => ({
        color: theme.colors.dangerDark,
        backgroundColor: theme.colors.dangerLight,
        border: 'none',

        ':hover': {
            backgroundColor: theme.colors.danger,
        },
        ':disabled': {
            backgroundColor: theme.colors.danger,
        },
    }),
};

const Button = (props: ButtonProps) => {
    return (
        <button css={[variants[props.variant ?? 'primary'], props.css]}>{props.children}</button>
    );
};

export default Button;
