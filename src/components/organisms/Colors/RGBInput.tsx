import { RgbaColor } from '@uiw/react-color';
import { Dispatch, SetStateAction } from 'react';
import { ColorValInput } from './ColorValInput';
import Box from 'components/layout/Box';

type RGBInputAProps = {
    wheelRadius?: number;
    rgba: RgbaColor;
    setRGBA: Dispatch<SetStateAction<RgbaColor>>;
    className?: string;
};

export const RGBInput = (props: RGBInputAProps) => {
    return (
        <Box className={props.className}>
            <ColorValInput
                label="R："
                name="HSLInput-r"
                type="number"
                value={props.rgba.r}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setRGBA((rgba) => ({
                        ...rgba,
                        r: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValInput
                label="G："
                name="HSLInput-g"
                type="number"
                value={props.rgba.g}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setRGBA((rgba) => ({
                        ...rgba,
                        g: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValInput
                label="G："
                name="HSLInput-b"
                type="number"
                value={props.rgba.b}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setRGBA((rgba) => ({
                        ...rgba,
                        b: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
        </Box>
    );
};
