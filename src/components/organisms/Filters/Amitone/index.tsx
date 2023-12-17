import { useEffect } from 'react';
import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { Vec2 } from 'application/core/units';
import { ImageURLDecoder } from 'application/files/ImageURLDecoder';
import { Amitone, AmitoneConfig } from 'application/filters/Amitone';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';

export const AmitoneButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Amitone()}
            filterLabel={'網トーン'}
            filterInitalConfigs={{
                tone: {
                    image: null,
                    size: new Vec2(0, 0),
                },
                threshold1: 0.8,
                threshold2: 0.3,
            }}
            ControlPanels={AmitoneWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const AmitoneWindowContents = ({
    onCancel,
    onConsent,
    configs,
    setConfigs,
}: GLFilterControlPanelsProps<AmitoneConfig>) => {
    useEffect(() => {
        (async () => {
            const image = await new ImageURLDecoder().decode('/image/tone.png');

            setConfigs((curVal) => ({
                ...curVal,
                tone: {
                    image,
                    size: new Vec2(image.width, image.height),
                },
            }));
        })();
    }, []);

    return (
        <Box>
            <NumberField
                value={configs.threshold1}
                id="bilateralButtonRadius"
                max={1}
                min={0}
                step={0.01}
                label="閾値2"
                setValue={(v) => {
                    setConfigs((curVal) => ({
                        ...curVal,
                        threshold1: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                    margin: '10px 0px',
                }}
            />
            <NumberField
                value={configs.threshold2}
                id="bilateralButtonRadius"
                max={1}
                min={0}
                step={0.01}
                label="閾値2"
                setValue={(v) => {
                    setConfigs((curVal) => ({
                        ...curVal,
                        threshold2: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                    margin: '10px 0px',
                }}
            />
            <ConfirmButtons
                css={{
                    width: '100%',
                    justifyContent: 'end',
                    marginTop: 10,
                }}
                onCancel={onCancel}
                onConsent={onConsent}
            />
        </Box>
    );
};
