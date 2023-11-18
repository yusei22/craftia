import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { LayerBlendModeSelector } from 'components/organisms/LayerBlendModeSelector';
import { LayerCreateButton } from 'components/organisms/LayerCreateButton';
import { LayerDeleteButton } from 'components/organisms/LayerDeleteButton';
import { LayerOpacitySlider } from 'components/organisms/LayerOpacitySlider';
import { LayerShadowCheakBox } from 'components/organisms/LayerShadowInputs/LayerShadowCheakBox';

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
                    <LayerCreateButton />
                    <LayerDeleteButton />
                </TabSection>
                <TabSection>
                    <Label size="sm">レイヤーのブレンドモード：</Label>
                    <LayerBlendModeSelector />
                </TabSection>
                <TabSection>
                    <Label size="sm">レイヤーの不透明度：</Label>
                    <LayerOpacitySlider />
                </TabSection>
                <TabSection>
                    <LayerShadowCheakBox />
                </TabSection>
            </Container>
        </>
    );
};
