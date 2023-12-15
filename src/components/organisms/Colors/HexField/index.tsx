import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColorValField } from '../ColorValField';
import Container from 'components/layout/Container';

type HEXInputProps = {
    wheelRadius?: number;
    hex: string;
    setHex: Dispatch<SetStateAction<string>>;
    className?: string;
};

export const HEXField = ({ className, hex, setHex }: HEXInputProps) => {
    const [hexDisplayVal, setHexDisplayVal] = useState<string>(hex);

    useEffect(() => {
        setHexDisplayVal(hex);
    }, [hex]);

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
                label="HEX："
                name="HexInput"
                type="text"
                width={100}
                value={hexDisplayVal}
                onChange={(e) => {
                    setHexDisplayVal(e.target.value);
                }}
                onBlur={(e) => {
                    setHex(e.target.value);
                }}
            />
        </Container>
    );
};
