import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, InputHTMLAttributes } from 'react';

export type InputProps = {
    css?: Interpolation<Theme>;
} & InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement>;

const inputCss: Interpolation<Theme> = (theme) => ({
    border: 'none',
    borderRadius: '3px',
    minWidth: '0ppx',
    outline: `1px solid ${theme.colors.neutralBright}`,
    boxSizing: 'border-box',
    padding: '6px 8px',
    accentColor: theme.colors.primaryMedium,
    ':focus': {
        border: 'none',
        outline: `2px solid ${theme.colors.primaryMedium}`,
    },
});

const Input = ({ css, ...props }: InputProps) => {
    return <input css={[inputCss, css]} {...props} />;
};

export default Input;
