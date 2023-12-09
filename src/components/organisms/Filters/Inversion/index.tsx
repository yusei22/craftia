import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { Inversion, InversionConfig } from 'application/filters/Inversion';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';

export const InversionButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Inversion()}
            filterLabel={'反転'}
            filterInitalConfigs={{}}
            ControlPanels={InversionWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const InversionWindowContents = ({
    onCancel,
    onConsent,
}: GLFilterControlPanelsProps<InversionConfig>) => {
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
