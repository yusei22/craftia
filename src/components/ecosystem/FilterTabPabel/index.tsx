import Button from 'components/atoms/Button';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { BilateralButton } from 'components/organisms/Filters/BilateralButton';
import { GaussianBlurButton } from 'components/organisms/Filters/GaussianBlurButton';
import { IllustrationButton } from 'components/organisms/Filters/IllustrationButton';
import { InversionButton } from 'components/organisms/Filters/InversionButton';
import { SobelButton } from 'components/organisms/Filters/SobelButton';
import { UnsharpMaskingButton } from 'components/organisms/Filters/UnsharpMaskingButton';

export const FilterTabPabel = () => {
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
                    <UnsharpMaskingButton>
                        <Button>アンシャープマスキング</Button>
                    </UnsharpMaskingButton>
                </TabSection>
                <TabSection>
                    <BilateralButton>
                        <Button>バイラテラル</Button>
                    </BilateralButton>
                </TabSection>
                <TabSection>
                    <GaussianBlurButton>
                        <Button>ガウシアンフィルタ</Button>
                    </GaussianBlurButton>
                </TabSection>
                <TabSection>
                    <SobelButton>
                        <Button>ソーベル</Button>
                    </SobelButton>
                </TabSection>
                <TabSection>
                    <InversionButton>
                        <Button>ネガポジ反転</Button>
                    </InversionButton>
                </TabSection>
                <TabSection>
                    <IllustrationButton>
                        <Button variant="danger">{'[NEW]'} イラスト化</Button>
                    </IllustrationButton>
                </TabSection>
            </Container>
        </>
    );
};
