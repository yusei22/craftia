import React from 'react';
import { styled } from 'styled-components';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';
import type { Responsive } from 'types';
import { toPropValue, Color, FontSize, Space } from 'utils/styles';

type SliderInputProps = {
  value: number;
  defaultValue: number;
  setValue: (value: number) => any;
  id: string;
  max?: number;
  min?: number;
  title?: string;
  sliderSize?: Responsive<Space>;
};
const Label = styled.label`
  width: 100%;
`;

const StyledInput = styled.input<{
  $width?: Responsive<Space>;
  $height?: Responsive<Space>;
  $backgroundColor?: Responsive<Color>;
  $padding?: Responsive<Space>;
  $fontSize?: Responsive<FontSize>;
  $color?: Responsive<Color>;
}>`
  ${(props) => toPropValue('font-size', props.$fontSize, props.theme)}
  ${(props) => toPropValue('color', props.$color, props.theme)}
    ${(props) => toPropValue('width', props.$width, props.theme)}
    ${(props) => toPropValue('height', props.$height, props.theme)}
    ${(props) => toPropValue('background-color', props.$backgroundColor, props.theme)}
    ${(props) => toPropValue('padding', props.$padding, props.theme)}
    border: none;
  &:focus {
    border: 0px solid #ddd; /*枠線*/
    outline: none;
  }
`;
const SliderInput = (props: SliderInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value);
    props.setValue(isNaN(value) ? props.defaultValue : value);
  };
  return (
    <>
      <Flex $justifyContent={'space-between'} $marginBottom={'5px'}>
        <Label htmlFor={props.id}>
          <Text $width={'100%'} $color={'text'} $fontSize={'medium'}>
            {props.title}
          </Text>
        </Label>
        <StyledInput
          type="number"
          value={props.value}
          onChange={handleChange}
          max={props.max}
          min={props.min}
          $backgroundColor={'primaryLight'}
          $color={'text'}
          $width={4}
          $height={3}
          $padding={'5px'}
          $fontSize={'medium'}
        />
      </Flex>
      <StyledInput
        type="range"
        value={props.value}
        onChange={handleChange}
        max={props.max}
        min={props.min}
        id={props.id}
        $width={props.sliderSize}
      />
    </>
  );
};
export default SliderInput;
