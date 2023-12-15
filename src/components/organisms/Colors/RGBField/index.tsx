import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColorValField } from '../ColorValField';
import { RGBColor } from '../WheelColorPicker';
import Container from 'components/layout/Container';

type RGBFieldProps = {
    rgb: RGBColor;
    setRGB: Dispatch<SetStateAction<RGBColor>>;
    className?: string;
};

export const RGBField = ({ rgb, setRGB, className }: RGBFieldProps) => {
    const [rgbDisplayVal, setRgbisplayVal] = useState<RGBColor>(rgb);

    useEffect(() => {
        setRgbisplayVal(rgb);
    }, [rgb]);

    return (
        <Container
            className={className}
            css={{
                flexFlow: 'column',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 5,
            }}
        >
            <ColorValField
                label="R："
                name="HSLInput-r"
                type="number"
                value={rgbDisplayVal.r}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setRgbisplayVal((rgb) => ({
                        ...rgb,
                        r: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setRGB((rgb) => ({
                        ...rgb,
                        r: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValField
                label="G："
                name="HSLInput-g"
                type="number"
                value={rgbDisplayVal.g}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setRgbisplayVal((rgb) => ({
                        ...rgb,
                        g: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setRGB((rgb) => ({
                        ...rgb,
                        g: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValField
                label="G："
                name="HSLInput-b"
                type="number"
                value={rgbDisplayVal.b}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setRgbisplayVal((rgb) => ({
                        ...rgb,
                        b: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setRGB((rgb) => ({
                        ...rgb,
                        b: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
        </Container>
    );
};
