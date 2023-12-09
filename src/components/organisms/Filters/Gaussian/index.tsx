import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { GaussianBlur, GaussianBlurConfig } from 'application/filters/GaussianBlur';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';
import { MAX_CONVOLUTION_RADIUS, MIN_CONVOLUTION_RADIUS } from 'consts';

export const GaussianBlurButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new GaussianBlur()}
            filterLabel="ガウシアンフィルタ"
            filterInitalConfigs={{
                radius: 1.5,
            }}
            ControlPanels={BilateralWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const BilateralWindowContents = ({
    onCancel,
    onConsent,
    configs,
    setConfigs,
}: GLFilterControlPanelsProps<GaussianBlurConfig>) => {
    return (
        <Box>
            <NumberField
                value={configs.radius}
                id="bilateralButtonRadius"
                max={MAX_CONVOLUTION_RADIUS}
                min={MIN_CONVOLUTION_RADIUS}
                step={0.5}
                label="半径"
                setValue={(v) => {
                    setConfigs((curVal) => ({
                        ...curVal,
                        radius: v,
                        sigma: v / 3,
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
