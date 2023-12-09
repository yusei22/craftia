import { Wheel, hexToHsva, hsvaToHex, hsvaToHexa, rgbaToHsva, hsvaToRgba } from '@uiw/react-color';
import ShadeSlider from '@uiw/react-color-shade-slider';
import { Dispatch, SetStateAction } from 'react';
import { HSLInput } from './HSLInput';
import { HEXInput } from './HexInput';
import { RGBInput } from './RGBInput';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';

type WheelColorPickerProps = {
    wheelRadius?: number;
    hsva: {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    setHsva: Dispatch<
        SetStateAction<{
            h: number;
            s: number;
            v: number;
            a: number;
        }>
    >;
    className?: string;
};

const WheelColorPicker = ({ wheelRadius, hsva, setHsva, className }: WheelColorPickerProps) => {
    return (
        <Container className={className} css={{
            flexFlow: 'column',
        }}>
            <Wheel
                color={hsva}
                onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                width={wheelRadius}
                height={wheelRadius}
            />
            <ShadeSlider
                hsva={hsva}
                onChange={(newShade) => {
                    setHsva({ ...hsva, ...newShade });
                }}
                css={{
                    marginTop: 20,
                    width:'100%',
                }}
            />
            <Box
                css={{
                    marginTop: 20,
                    width: '100%',
                    height: 20,
                }}
                style={{
                    backgroundColor: hsvaToHex(hsva),
                }}
            />
            <Box
                css={{
                    marginTop: 20,
                }}
            >
                <HSLInput
                    hsva={hsva}
                    setHsva={setHsva}
                    css={{
                        width: '80%',
                    }}
                />
                <RGBInput
                    rgba={hsvaToRgba(hsva)}
                    setRGBA={(rgba) => {
                        setHsva((hsva) => {
                            const _rgba =
                                typeof rgba === 'function' ? rgba(hsvaToRgba(hsva)) : rgba;
                            return rgbaToHsva(_rgba);
                        });
                    }}
                    css={{
                        width: '80%',
                    }}
                />
                <HEXInput
                    hexa={hsvaToHex(hsva)}
                    setHexa={(hexa) => {
                        setHsva((hsva) => {
                            const _hex = typeof hexa === 'function' ? hexa(hsvaToHexa(hsva)) : hexa;
                            return hexToHsva(_hex);
                        });
                    }}
                    css={{
                        width: '80%',
                    }}
                />
            </Box>
        </Container>
    );
};
export default WheelColorPicker;
