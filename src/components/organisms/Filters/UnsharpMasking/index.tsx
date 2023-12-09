import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { UnsharpMasking, UnsharpMaskingConfig } from 'application/filters/UnsharpMasking';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';
import {
    MAX_CONVOLUTION_RADIUS,
    MAX_UNSHARPMASKING_THRESHOLD,
    MIN_CONVOLUTION_RADIUS,
    MIN_UNSHARPMASKING_THRESHOLD,
} from 'consts';

export const UnsharpMaskingButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new UnsharpMasking()}
            filterLabel={'アンシャープマスキング'}
            filterInitalConfigs={{
                radius: 3,
                threshold: 1.5,
            }}
            ControlPanels={UnsharpMaskingControlPanels}
        >
            {children}
        </GLFilterButton>
    );
};

const UnsharpMaskingControlPanels = ({
    onCancel,
    onConsent,
    configs,
    setConfigs,
}: GLFilterControlPanelsProps<UnsharpMaskingConfig>) => {
    return (
        <Box>
            <NumberField
                value={configs.radius}
                id="unsharpMaskingPanelRadius"
                max={MAX_CONVOLUTION_RADIUS}
                min={MIN_CONVOLUTION_RADIUS}
                step={1}
                label="半径"
                setValue={(v) => {
                    setConfigs((curVal) => ({
                        ...curVal,
                        radius: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                }}
            />
            <NumberField
                value={configs.threshold}
                id="unsharpMaskingPanelThreshold"
                max={MAX_UNSHARPMASKING_THRESHOLD}
                min={MIN_UNSHARPMASKING_THRESHOLD}
                step={0.1}
                label="閾値"
                setValue={(v) => {
                    setConfigs((curVal) => ({
                        ...curVal,
                        threshold: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
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
