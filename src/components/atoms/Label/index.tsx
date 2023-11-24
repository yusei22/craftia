import { Theme } from '@emotion/react';
import { ClassAttributes, LabelHTMLAttributes } from 'react';

type LabelProps = {
    size?: keyof Theme['fontSize'];
} & LabelHTMLAttributes<HTMLLabelElement> &
    ClassAttributes<HTMLLabelElement>;

const Label = ({ size = 'md', ...props }: LabelProps) => {
    return (
        <label
            css={(theme) => ({
                fontSize: theme.fontSize[size],
                accentColor: theme.colors.primary600,
            })}
            {...props}
        />
    );
};
export default Label;
