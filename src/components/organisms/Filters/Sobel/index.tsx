import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { Sobel, SobelConfig } from 'application/filters/Sobel';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';

export const SobelButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Sobel()}
            filterLabel={'ソーベル線画抽出'}
            filterInitalConfigs={{}}
            ControlPanels={SobelWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const SobelWindowContents = ({ onCancel, onConsent }: GLFilterControlPanelsProps<SobelConfig>) => {
    return (
        <Box>
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
