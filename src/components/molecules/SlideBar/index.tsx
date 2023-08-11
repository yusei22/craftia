import { SliderProps } from '@mui/material'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { styled } from 'styled-components'
import type { Responsive } from 'types'
import type { Color, FontSize } from 'utils/styles'
type SliderInputProps = {
    value: number
    setValue: Function
    id: string
    title?: string
    titleSize?: Responsive<FontSize>
    titleColor?: Responsive<Color>
}
const Label = styled.label`
    width:100%
`
function convertToNumber(input: string): number | null {
    // 全角・半角の空白を取り除く
    const cleanedInput = input.replace(/\s/g, '');

    // 文字列を数値に変換する
    const numberValue = parseFloat(cleanedInput);

    // NaNの場合は変換に失敗したとみなす
    if (isNaN(numberValue)) {
        return null;
    }

    return numberValue;
}



const SliderInput = (props: SliderInputProps) => {
    return (
        <>
            <Flex>
                <Label htmlFor={props.id}>
                    <Text $width={'100%'}>
                        {props.title}
                    </Text>
                </Label>
                <input type='number' value={props.value} ></input>
                <input id={props.id} type='range' value={props.value}></input>
            </Flex>
        </>
    )
}