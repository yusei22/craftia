import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { Binarization, BinarizationConfig, BinarizationExecutor } from 'application/filters/Binarization';
import { NumberField } from 'components/molecules/NumberField';
import Button from 'components/atoms/Button';

export const BinarizationButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Binarization()}
            filterLabel={"二値化"}
            filterInitalConfigs={{
                threshold: 0.5
            }}
            ControlPanels={BinarizationnWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const BinarizationnWindowContents = ({
    onCancel,
    onConsent,
    configs,
    setConfigs,
    targetSprite
}: GLFilterControlPanelsProps<BinarizationConfig>) => {

    return (
        <Box>
            <NumberField
                value={configs.threshold}
                id="bilateralButtonRadius"
                max={1}
                min={0}
                step={0.01}
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
            <Button
                onClick={() => {
                    (async () => {
                        const threshold = await BinarizationExecutor.discriminantAnalysishreshold(targetSprite.image);
                        setConfigs({
                            threshold: threshold / 255
                        })
                    })()
                }}
            >
                判別分析
            </Button>
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
