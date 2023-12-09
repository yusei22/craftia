import Label from 'components/atoms/Label';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import LayerColumn from 'components/organisms/LayerColum';
import { LayerBlendModeSelector } from 'components/organisms/Layers/LayerBlendModeSelector';
import { LayerOpacitySlider } from 'components/organisms/Layers/LayerOpacitySlider';

export type LayerSectionProps = {
    className?: string;
    panelWidth?: number;
    panelHeight?: number;
};

export const LayerSection = ({ className, panelWidth, panelHeight }: LayerSectionProps) => {
    return (
        <Container
            className={className}
            css={(theme) => ({
                alignItems: 'start',
                justifyContent: 'end',
                flexFlow: 'column',
                backgroundColor: theme.colors.neutral200,
                padding: 10,
                color: theme.colors.text,
            })}
        >
            <Box
                css={(theme) => ({
                    padding: 10,
                    width: '100%',
                    backgroundColor: theme.colors.primary200,
                    borderRadius: 5,
                })}
            >
                <Container
                    css={{
                        width: '100%',
                    }}
                >
                    <Label
                        size="sm"
                        css={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        ブレンドモード：
                    </Label>
                    <LayerBlendModeSelector
                        css={{
                            marginLeft: 3,
                            width: '100%',
                        }}
                    />
                </Container>
                <Box
                    css={{
                        marginTop: 10,
                    }}
                >
                    <LayerOpacitySlider
                        css={{
                            width: '100%',
                        }}
                    />
                </Box>
            </Box>

            <Box
                css={(theme) => ({
                    marginTop: 10,
                    padding: '5px 0px 5px 5px',
                    height: '100%',
                    overflowY: 'auto',
                    backgroundColor: theme.colors.primary100,
                    borderRadius: 5,
                    width: panelWidth ? panelWidth + 20 : '100%',
                    '::-webkit-scrollbar': {
                        width: 10,
                        backgroundColor: theme.colors.neutral100
                    },
                    '::-webkit-scrollbar-track':{
                        backgroundColor: theme.colors.neutral100
                    },
                    '::-webkit-scrollbar-thumb':{
                        backgroundColor: theme.colors.neutral300
                    }
                })}
            >
                <LayerColumn width={panelWidth} height={panelHeight} />
            </Box>
        </Container>
    );
};
