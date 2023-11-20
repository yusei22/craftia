import { PenBlendModeSelector } from '../../organisms/Pens/PenBlendModeSelector';
import { PenOpacitySlider } from '../../organisms/Pens/PenOpacitySlider';
import { PenRealTimeStabiCheaxkBox } from '../../organisms/Pens/PenRealTimeStabiCheaxkBox';
import { PenStabilizationSlider } from '../../organisms/Pens/PenStabilizationSlider';
import { PenWidthSlider } from '../../organisms/Pens/PenWidthSlider';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';

export const DrawTabPanel = () => {
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
                    <PenWidthSlider />
                    <PenOpacitySlider />
                </TabSection>
                <TabSection>
                    <PenRealTimeStabiCheaxkBox />
                    <PenStabilizationSlider />
                </TabSection>
                <TabSection>
                    <PenBlendModeSelector />
                </TabSection>
            </Container>
        </>
    );
};
