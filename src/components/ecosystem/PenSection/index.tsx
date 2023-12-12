import { PenBlendModeField } from '../../organisms/PenMenues/BlendMode';
import { PenOpacityField } from '../../organisms/PenMenues/Opacity';
import { PenRealTimeStabilizationField } from '../../organisms/PenMenues/RealTimeStabilization';
import { PenSizeField } from '../../organisms/PenMenues/Size';
import { PenStabilizationField } from '../../organisms/PenMenues/Stabilization';
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
                <PenSizeField
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />
                <PenOpacityField
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />

                <PenRealTimeStabilizationField
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />
                <PenStabilizationField
                    css={{
                        marginTop: 20,
                        width: '100%',
                    }}
                />

                <PenBlendModeField
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
