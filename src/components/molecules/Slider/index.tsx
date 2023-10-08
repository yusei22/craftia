import Input from "components/atoms/Input";
import Label from "components/atoms/Label";
import Container from "components/layout/Container";

type SliderInputProps = {
    uniqueId: string;
    value?: number;
    setValue?: (value: number) => void;
    label?: string;
    size?: number | string;
    min?: number;
    max?: number;
};

const Slider = (props: SliderInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value);
        props.setValue?.(value);
    };
    return (
        <Container>
            <Label
                htmlFor={props.uniqueId}
            >
                {props.label}
            </Label>
            <input
                type='range'
                value={props.value}
                css={theme => ({
                    accentColor: theme.colors.primaryDark,
                    width: props.size,
                    marginRight: theme.space.md,
                    marginLeft: theme.space.md
                })}
                min={props.min}
                max={props.max}
                onChange={handleChange}
            />
            <Input
                type='number'
                value={props.value}
                min={props.min}
                max={props.max}
                onChange={handleChange}
                css={{
                    width: '100px'
                }}
            />
        </Container>
    )
}
export default Slider;