import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { LayerBlendModeSelector } from 'components/organisms/LayerBlendModeSelector';
import { LayerCreateButton } from 'components/organisms/LayerCreateButton';
import { LayerOpacitySlider } from 'components/organisms/LayerOpacitySlider';

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
                    <Label size="sm">レイヤーのブレンドモード：</Label>
                    <LayerBlendModeSelector />
                </TabSection>
                <TabSection>
                    <Label size="sm">レイヤーの不透明度：</Label>
                    <LayerOpacitySlider />
                </TabSection>
                <TabSection>
                    <LayerCreateButton />
                </TabSection>
            </Container>
        </>
    );
};
