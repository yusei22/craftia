import { HsvColor } from '@uiw/react-color';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColorValField } from '../ColorValField';
import Container from 'components/layout/Container';

type HsvFieldProps = {
    hsv: HsvColor;
    setHSV: Dispatch<SetStateAction<HsvColor>>;
    className?: string;
};

export const HsvField = ({ className, hsv, setHSV }: HsvFieldProps) => {
    const [hsvDisplayVal, setHsvisplayVal] = useState<HsvColor>(hsv);

    useEffect(() => {
        setHsvisplayVal(hsv);
    }, [hsv]);

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
                label="H："
                name="HSLInput-h"
                type="number"
                value={hsvDisplayVal.h}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setHsvisplayVal((curVal) => ({
                        ...curVal,
                        h: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setHSV((curVal) => ({
                        ...curVal,
                        h: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValField
                label="S："
                name="HSLInput-s"
                type="number"
                value={hsvDisplayVal.s}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setHsvisplayVal((curVal) => ({
                        ...curVal,
                        s: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setHSV((curVal) => ({
                        ...curVal,
                        s: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
            <ColorValField
                label="V："
                name="HSLInput-v"
                type="number"
                value={hsvDisplayVal.v}
                step={1}
                min={0}
                max={255}
                onChange={(e) => {
                    setHsvisplayVal((curVal) => ({
                        ...curVal,
                        v: parseFloat(e.target.value) || 0,
                    }));
                }}
                onBlur={(e) => {
                    setHSV((curVal) => ({
                        ...curVal,
                        v: parseFloat(e.target.value) || 0,
                    }));
                }}
            />
        </Container>
    );
};
