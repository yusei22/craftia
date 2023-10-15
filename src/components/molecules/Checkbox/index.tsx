import { Theme } from '@emotion/react';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';

export type CheckboxSize = keyof Theme['fontSize'];

export type CheckboxProps = {
    uniqueId: string;
    size?: CheckboxSize;
    label?: string;
    value?: string | number | readonly string[];
    checked?: boolean;
    setChecked?: (cheacked: boolean) => void;
};

const Checkbox = ({ size = 'md', ...props }: CheckboxProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => [
        props.setChecked?.(e.currentTarget.checked),
    ];
    return (
        <Container>
            <input
                checked={props.checked}
                type="checkbox"
                value={props.value}
                onChange={onChange}
                id={props.uniqueId}
                css={(theme) => ({
                    width: theme.fontSize[size],
                    height: theme.fontSize[size],
                    accentColor: theme.colors.primaryDark,
                })}
            />
            <Label size={size} htmlFor={props.uniqueId}>
                {props.label}
            </Label>
        </Container>
    );
};
export default Checkbox;
