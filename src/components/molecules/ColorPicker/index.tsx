import { css } from '@emotion/react';
import { HexColorPicker } from 'react-colorful';
import Wrapper from 'components/layout/Wrapper';

const colorPickerStyle = css({
    width: '200px !important',
    height: '200px !important',
    '.react-colorful__last-control': {
        marginTop: '10px !important',
        borderRadius: '2px !important',
    },
    '.react-colorful__saturation': {
        borderRadius: '2px !important',
    },
});

type ColorPickerProps = {
    color?: string;
    onChange?: ((newColor: string) => void) | undefined;
};

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
    return (
        <Wrapper>
            <HexColorPicker
                color={color}
                onChange={onChange}
                css={colorPickerStyle}
            ></HexColorPicker>
        </Wrapper>
    );
};
