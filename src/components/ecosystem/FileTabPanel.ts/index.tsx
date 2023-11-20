import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { RenoButton } from 'components/organisms/Edits/RenoButton';
import { UndoButton } from 'components/organisms/Edits/UndoButton';
import { ExportButton } from 'components/organisms/Files/ExportButton';

export const FileTabPanel = () => {
    return (
        <>
            <Container
                css={{
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '0px 10px',
                }}
            >
                <TabSection>
                    <UndoButton />
                </TabSection>
                <TabSection>
                    <RenoButton />
                </TabSection>
                <TabSection>
                    <ExportButton />
                </TabSection>
            </Container>
        </>
    );
};
