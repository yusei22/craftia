import { PenBlendModeSelector } from '../../organisms/Pens/PenBlendModeSelector';
import { PenOpacitySlider } from '../../organisms/Pens/PenOpacitySlider';
import { PenRealTimeStabiCheaxkBox } from '../../organisms/Pens/PenRealTimeStabiCheaxkBox';
import { PenStabilizationSlider } from '../../organisms/Pens/PenStabilizationSlider';
import { PenWidthSlider } from '../../organisms/Pens/PenWidthSlider';
import Container from 'components/layout/Container';

type PenSectionProps = {
    className?: string;
};
export const PenSection = ({ className }: PenSectionProps) => {
    return (
        <>
            <Container
                className={className}
                css={(theme) => ({
                    padding: '20px 0px',
                    alignItems: 'start',
                    flexFlow: 'column',
                    backgroundColor: theme.colors.neutral100,
                })}
            >
                <PenWidthSlider
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />
                <PenOpacitySlider
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />

                <PenRealTimeStabiCheaxkBox
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />
                <PenStabilizationSlider
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />

                <PenBlendModeSelector
                    css={{
                        marginTop: 20,
                        flexFlow: 'column',
                        width: '100%',
                    }}
                />
            </Container>
        </>
    );
};
