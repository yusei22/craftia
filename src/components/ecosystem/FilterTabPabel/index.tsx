import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
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
                        <Button>
                            <Typography variant="small">アンシャープマスキング</Typography>
                        </Button>
                    </UnsharpMaskingButton>
                </TabSection>
                <TabSection>
                    <BilateralButton>
                        <Button>
                            <Typography variant="small">バイラテラルフィルタ</Typography>
                        </Button>
                    </BilateralButton>
                </TabSection>
                <TabSection>
                    <GaussianBlurButton>
                        <Button>
                            <Typography variant="small">ガウシアンフィルタ</Typography>
                        </Button>
                    </GaussianBlurButton>
                </TabSection>
                <TabSection>
                    <SobelButton>
                        <Button>
                            <Typography variant="small">ソーベル</Typography>
                        </Button>
                    </SobelButton>
                </TabSection>
                <TabSection>
                    <InversionButton>
                        <Button>
                            <Typography variant="small">ネガポジ反転</Typography>
                        </Button>
                    </InversionButton>
                </TabSection>
                <TabSection>
                    <IllustrationButton>
                        <Button variant="danger">
                            <Typography variant="small">{'[NEW]'} イラスト化</Typography>
                        </Button>
                    </IllustrationButton>
                </TabSection>
            </Container>
        </>
    );
};
