import { Wheel, rgbaToHsva } from '@uiw/react-color';
import ShadeSlider from '@uiw/react-color-shade-slider';
import { useRecoilState } from 'recoil';
import { HsvField } from './HSLField';
import { HEXField } from './HexField';
import { RGBField } from './RGBField';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import { HSVColorSelector } from 'dataflow/colors/HSVColorSelector';
import { HexColorSelector } from 'dataflow/colors/HexColorSelector';
import { RGBColorAtom } from 'dataflow/colors/RGBColorAtom';

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};

type WheelColorPickerProps = {
    wheelRadius?: number;
    className?: string;
};

const WheelColorPicker = ({ wheelRadius, className }: WheelColorPickerProps) => {
    const [hsv, setHSV] = useRecoilState(HSVColorSelector);
    const [hex, setHex] = useRecoilState(HexColorSelector);
    const [rgb, setRGB] = useRecoilState(RGBColorAtom);

    return (
        <Container
            className={className}
            css={{
                flexFlow: 'column',
            }}
        >
            <Wheel
                color={rgbaToHsva({ ...rgb, a: 1.0 })}
                onChange={(color) => setHSV(color.hsv)}
                width={wheelRadius}
                height={wheelRadius}
            />
            <ShadeSlider
                hsva={{ ...hsv, a: 1.0 }}
                onChange={(newShade) =>
                    setHSV((curVal) => ({
                        ...curVal,
                        ...newShade,
                    }))
                }
                css={{
                    marginTop: 20,
                    width: '100%',
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
                <HsvField hsv={hsv} setHSV={setHSV} />
                <RGBField rgb={rgb} setRGB={setRGB} />
                <HEXField hex={hex} setHex={setHex} />
            </Container>
        </Container>
    );
};
export default WheelColorPicker;
