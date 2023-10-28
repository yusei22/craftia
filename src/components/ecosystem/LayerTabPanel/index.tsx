import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { LayerBlendModeSelector } from 'components/organisms/LayerBlendModeSelector';

export const LayerTabPanel = () => {
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
                    <LayerBlendModeSelector />
                </TabSection>
            </Container>
        </>
    );
};
