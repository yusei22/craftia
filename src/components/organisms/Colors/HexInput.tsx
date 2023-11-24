import { Dispatch, SetStateAction } from 'react';
import { ColorValInput } from './ColorValInput';
import Box from 'components/layout/Box';

type HEXInputProps = {
    wheelRadius?: number;
    hexa: string;
    setHexa: Dispatch<SetStateAction<string>>;
    className?: string;
};

export const HEXInput = (props: HEXInputProps) => {
    return (
        <Box className={props.className}>
            <ColorValInput
                label="HEX："
                name="HexInput"
                type="text"
                width={100}
                value={props.hexa}
                onChange={(e) => {
                    props.setHexa(e.target.value);
                }}
            />
        </Box>
    );
};
