import React, { useState } from 'react'
type NumberInputProps = {
    value: number
    defaultValue: number
    id?: string
    min?: number
    max?: number
    onValidation?: (value: number | null) => any
}

function convertToNumber(input: string): number | null {
    function toHalfnums(str: string) {
        return str.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
    const cleanedInput = input.replace(/\s/g, '');
    const halfValue = toHalfnums(cleanedInput)
    const numberValue = parseFloat(halfValue);
    if (isNaN(numberValue)) {
        return null;
    }
    return numberValue;
}

function validationValue(value: string, defualt: number, max?: number, min?: number) {
    const convertedNumber = convertToNumber(value)
    if (convertedNumber) {
        const BoundedUpperNumber = max ? Math.min(convertedNumber, max) : convertedNumber
        const BoundedNUmber = min ? Math.max(BoundedUpperNumber, min) : BoundedUpperNumber
        return BoundedNUmber.toString();
    }
    else {
        return defualt.toString()
    }
}

const NumberInput = (props: NumberInputProps) => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue(validationValue(value, props.defaultValue, props.max, props.min))
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setValue(validationValue(value, props.defaultValue, props.max, props.min))
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setValue(validationValue(value, props.defaultValue, props.max, props.min))
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    id={props.id}
                    onKeyDown={handleKeyDown}
                />
            </form>

        </>
    )
}
export { NumberInput }