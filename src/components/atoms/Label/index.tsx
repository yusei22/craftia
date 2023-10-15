import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, LabelHTMLAttributes } from 'react';

type LabelProps = {
    size?: keyof Theme['fontSize'];
    css?: Interpolation<Theme>;
} & LabelHTMLAttributes<HTMLLabelElement> &
    ClassAttributes<HTMLLabelElement>;

const Label = ({ size = 'md', css, ...props }: LabelProps) => {
    return (
        <label
            css={[
                (theme) => ({
                    fontSize: theme.fontSize[size],
                    accentColor: theme.colors.primaryDark,
                }),
                css,
            ]}
            {...props}
        />
    );
};
export default Label;
