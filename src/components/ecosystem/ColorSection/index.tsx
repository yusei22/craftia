import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import Container from 'components/layout/Container';
import { HSVColorSelector } from 'dataflow/colors/HSVColorSelector';

const WheelColorPicker = dynamic(() => import('../../organisms/Colors/WheelColorPicker'), {
    ssr: false,
});

type ColorSectionProps = {
    className?: string;
    wheelRadius?: number;
};

export const ColorSection = ({ className, wheelRadius: wheelRadius }: ColorSectionProps) => {
    const [hsv, setHSV] = useRecoilState(HSVColorSelector);

    return (
        <Container
            className={className}
            css={(theme) => ({
                padding: '20px 0px',
                alignItems: 'start',
                backgroundColor: theme.colors.neutral100,
            })}
        >
            <Box>
                <WheelColorPicker
                    wheelRadius={wheelRadius}
                    hsva={{
                        ...hsv,
                        a: 1.0,
                    }}
                    setHsva={(HSVOrUpdater) => {
                        setHSV((curHsv) => {
                            return typeof HSVOrUpdater === 'function'
                                ? HSVOrUpdater({
                                      ...curHsv,
                                      a: 1.0,
                                  })
                                : HSVOrUpdater;
                        });
                    }}
                />
            </Box>
        </Container>
    );
};
