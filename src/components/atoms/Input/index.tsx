import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>;

const inputCss: Interpolation<Theme> = (theme) => ({
    border: 'none',
    borderRadius: '3px',
    minWidth: '0ppx',
    outline: `1px solid ${theme.colors.neutral300}`,
    boxSizing: 'border-box',
    padding: '6px 8px',
    backgroundColor: theme.colors.neutral100,
    color: theme.colors.text,
    accentColor: theme.colors.neutral400,
    ':focus': {
        border: 'none',
        outline: `2px solid ${theme.colors.primary400}`,
    },
});

const Input = ({ ...props }: InputProps) => {
    return <input css={inputCss} {...props} />;
};

export default Input;
