import { GLFilterButton, GLFilterControlPanelsProps } from '../GLFilterButton';
import { Illustration, IllustrationConfig } from 'application/filters/Illustration';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';

export const IllustrationButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Illustration()}
            filterLabel={"イラスト化"}
            filterInitalConfigs={{}}
            ControlPanels={IllustrationWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const IllustrationWindowContents = ({
    onCancel,
    onConsent,
}: GLFilterControlPanelsProps<IllustrationConfig>) => {

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
