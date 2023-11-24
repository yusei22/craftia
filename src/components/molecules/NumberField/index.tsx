import { ChangeEventHandler } from 'react';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';

type SliderInputProps = {
    label?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    pattern?: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    slider?: boolean;
    setValue?: (n: number) => unknown;
};

export const NumberField = ({ slider = true, ...props }: SliderInputProps) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const v = parseFloat(e.currentTarget.value) || 0;

        props.setValue?.(v);
    };
    return (
        <Container
            css={{
                width: props.width,
                height: props.height,
                justifyContent: 'space-between',
                alignItems: 'start',
            }}
            className={props.className}
        >
            <Container
                css={{
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Label size="sm">{props.label}</Label>
                <Input
                    type="number"
                    css={(theme) => ({
                        marginLeft: theme.space.sm,
                    })}
                    value={props.value}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                    onChange={onChange}
                />
            </Container>
            {slider ? (
                <input
                    css={{
                        width: '100%',
                    }}
                    type="range"
                    value={props.value}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                    onChange={onChange}
                />
            ) : null}
        </Container>
    );
};
