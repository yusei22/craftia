import { ChangeEventHandler } from 'react';
import { FoldingSlider } from '../FoldingSlider';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';

type SmallNumberFieldProps = {
    label?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    pattern?: string;
    className?: string;
    slider?: boolean;
    setValue?: (n: number) => unknown;
};

export const SmallNumberField = ({ slider = true, ...props }: SmallNumberFieldProps) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const v = parseFloat(e.currentTarget.value) || 0;

        props.setValue?.(v);
    };

    return (
        <>
            <Container
                css={{
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
                    <Label
                        size="sm"
                        css={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {props.label}
                    </Label>
                    <Input
                        type="number"
                        css={{
                            maxWidth: '100%',
                        }}
                        value={props.value}
                        step={props.step}
                        min={props.min}
                        max={props.max}
                        onChange={onChange}
                    />
                    {slider ? (
                        <FoldingSlider
                            value={props.value}
                            setValue={props.setValue}
                            min={props.min}
                            max={props.max}
                            step={props.step}
                            align="end"
                            position="initial"
                        />
                    ) : null}
                </Container>
            </Container>
        </>
    );
};
