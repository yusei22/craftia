import { ChangeEventHandler } from 'react';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { MQ } from 'mediaQuery';

type SliderInputProps = {
    uniqueId: string;
    value?: number;

    step?: number;
    label?: string;
    sliderSize?: number;
    labelSize?: number;

    min?: number;
    max?: number;
    setValue?: (value: number) => void;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onInput?: ChangeEventHandler<HTMLInputElement>;

    foldable?: boolean;
    foldableBreakpoint?: keyof typeof MQ;
};

const Slider = (props: SliderInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value);
        props.setValue?.(value);
        props.onChange?.(e);
    };
    return (
        <Container css={{ width: '100%', justifyContent: 'flex-start' }}>
            <Label htmlFor={props.uniqueId} size="sm" css={{ width: props.labelSize }}>
                {props.label}
            </Label>
            <input
                type="range"
                value={props.value}
                step={props.step}
                css={(theme) => ({
                    accentColor: theme.colors.primaryDark,
                    width: props.sliderSize,
                    marginLeft: theme.space.sm,

                    display: props.foldable ? 'none' : 'block',
                    [MQ[props.foldableBreakpoint ?? 'md']]: {
                        display: 'block',
                    },
                })}
                min={props.min}
                max={props.max}
                onChange={handleChange}
                onInput={props.onInput}
            />
            <Input
                type="number"
                value={props.value}
                step={props.step}
                min={props.min}
                max={props.max}
                onChange={handleChange}
                onInput={props.onInput}
                css={(theme) => ({
                    marginLeft: theme.space.sm,
                    width: '30%',
                })}
            />
        </Container>
    );
};
export default Slider;
