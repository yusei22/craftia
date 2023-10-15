import Button from 'components/atoms/Button';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { BilateralButton } from 'components/organisms/Filters/BilateralButton';
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
            </Container>
        </>
    );
};
