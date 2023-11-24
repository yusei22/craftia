import { HsvaColor } from '@uiw/react-color';
import { Dispatch, SetStateAction } from 'react';
import { ColorValInput } from './ColorValInput';
import Box from 'components/layout/Box';

type HSLInputProps = {
    wheelRadius?: number;
    hsva: HsvaColor;
    setHsva: Dispatch<SetStateAction<HsvaColor>>;
    className?: string;
};

export const HSLInput = (props: HSLInputProps) => {
    return (
        <Box className={props.className}>
            <ColorValInput
                label="H："
                name="HSLInput-h"
                type="number"
                value={props.hsva.h}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setHsva((hsva) => ({
                        ...hsva,
                        h: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValInput
                label="S："
                name="HSLInput-s"
                type="number"
                value={props.hsva.s}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setHsva((hsva) => ({
                        ...hsva,
                        s: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValInput
                label="V："
                name="HSLInput-v"
                type="number"
                value={props.hsva.v}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    props.setHsva((hsva) => ({
                        ...hsva,
                        v: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
        </Box>
    );
};
