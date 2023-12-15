import { ChangeEventHandler } from 'react';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';

export type ColorValInputProps = {
    type?: string;
    name?: string;
    label?: string;
    value?: string | number;
    min?: number;
    max?: number;
    step?: number;
    width?: number | string;
    height?: number | string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
};

export const ColorValField = (props: ColorValInputProps) => {
    return (
        <Container
            css={{
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Label htmlFor={props.name} size="sm">
                {props.label}
            </Label>
            <Input
                name={props.name}
                type={props.type}
                value={props.value}
                step={props.step}
                min={props.min}
                max={props.max}
                onChange={props.onChange}
                onBlur={props.onBlur}
                css={{
                    boxSizing: 'border-box',
                    width: props.width,
                    height: props.height,
                }}
            />
        </Container>
    );
};
