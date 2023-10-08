import { Interpolation, Theme, FunctionInterpolation } from '@emotion/react';
import { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>;
};

const inputCss: Interpolation<Theme> = theme => ({
    border: 'none',
    borderRadius: '3px',
    minWidth: '0ppx',
    outline: `1px solid ${theme.colors.neutralBright}`,
    boxSizing: 'border-box',
    padding: '6px 8px',
    accentColor: theme.colors.primaryMedium,
    ":focus": {
        border: 'none',
        outline: `2px solid ${theme.colors.primaryMedium}`,
    }
})

const Input = ({ css, ...props }: InputProps) => {
    return (
        <input css={[inputCss, css]} {...props} />
    )
}

export default Input;