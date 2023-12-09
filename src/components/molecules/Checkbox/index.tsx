import { Theme } from '@emotion/react';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';

export type CheckboxSize = keyof Theme['fontSize'];

export type CheckboxProps = {
    id: string;
    size?: CheckboxSize;
    label?: string;
    value?: string | number | readonly string[];
    checked?: boolean;
    className?: string;
    setChecked?: (cheacked: boolean) => void;
};

const Checkbox = ({ size = 'md', className, ...props }: CheckboxProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => [
        props.setChecked?.(e.currentTarget.checked),
    ];
    return (
        <Container className={className}>
            <input
                checked={props.checked}
                type="checkbox"
                value={props.value}
                onChange={onChange}
                id={props.id}
                css={(theme) => ({
                    width: theme.fontSize[size],
                    height: theme.fontSize[size],
                    accentColor: theme.colors.neutral600,
                    backgroundColor: theme.colors.neutral100
                })}
            />
            <Label size={size} htmlFor={props.id}>
                {props.label}
            </Label>
        </Container>
    );
};
export default Checkbox;
