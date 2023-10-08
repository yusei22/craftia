import { Theme } from "@emotion/react";
import Label from "components/atoms/Label";
import Container from "components/layout/Container";

export type CheckboxSize = keyof Theme['fontSize']

export type CheckboxProps = {
    uniqueId: string;
    label?: string;
    size?: CheckboxSize;
    checked?: boolean;
    setChecked?: (value: boolean) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({ size = 'md', ...props }: CheckboxProps) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
    }
    return (
        <Container>
            <input
                checked={props.checked}
                type="checkbox"
                onChange={onChange}
                id={props.uniqueId}
                css={theme => ({
                    width: theme.fontSize[size],
                    height: theme.fontSize[size],
                    accentColor: theme.colors.primaryDark
                })}
                value={'vaaa'}
            />
            <Label size={size} htmlFor={props.uniqueId}>
                {props.label}
            </Label>
        </Container>
    )
}
export default Checkbox;