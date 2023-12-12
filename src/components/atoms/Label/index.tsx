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
                color: theme.colors.text,
                accentColor: theme.colors.primary600,
                whiteSpace: 'nowrap',
            })}
            {...props}
        />
    );
};
export default Label;
