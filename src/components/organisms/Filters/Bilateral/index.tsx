import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { Bilateral, BilateralConfig } from 'application/filters/Bilateral';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';
import { MAX_CONVOLUTION_RADIUS, MIN_CONVOLUTION_RADIUS } from 'consts';

export const BilateralButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Bilateral()}
            filterLabel={'バイラテラルフィルタ'}
            filterInitalConfigs={{
                radius: 3,
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
}: GLFilterControlPanelsProps<BilateralConfig>) => {
    return (
        <Box>
            <NumberField
                value={configs.radius}
                id="bilateralButton_radius"
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
