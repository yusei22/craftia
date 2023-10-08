import { Interpolation, Theme } from '@emotion/react';
import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    size?: keyof Theme['fontSize'];
    css?: Interpolation<Theme>;
}

const Label = ({ size = 'md', css, ...props }: LabelProps) => {
    return (
        <label
            css={[(theme) => ({
                fontSize: theme.fontSize[size],
                accentColor: theme.colors.primaryDark
            })]}
            {...props}
        />
    )
}
export default Label