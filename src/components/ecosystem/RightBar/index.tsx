import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRecoilValue } from 'recoil';
import IconButton from 'components/atoms/IconButton';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import LayerColumn from 'components/organisms/LayerColum';
import { LayerBlendModeField } from 'components/organisms/LayerMenues/BlendMode';
import { LayerCreateButton } from 'components/organisms/LayerMenues/Creater';
import { LayerDeleteButton } from 'components/organisms/LayerMenues/Deleter';
import { LayerOpacityField } from 'components/organisms/LayerMenues/Opacity';
import { layerSectionVisibilityAtom } from 'dataflow/displays/layerSectionVisibilityAtom';

export type RightBarProps = {
    className?: string;
};

export const RightBar = ({ className }: RightBarProps) => {
    const layerSectionVisibility = useRecoilValue(layerSectionVisibilityAtom);
    return (
        <Box
            css={{
                overflow: 'hidden',
                width: layerSectionVisibility ? 'auto' : 0,
                height: '100%',
            }}
        >
            <Container
                className={className}
                css={(theme) => ({
                    width: '100%',
                    height: '100%',
                    alignItems: 'start',
                    justifyContent: 'end',
                    flexFlow: 'column',
                    backgroundColor: theme.colors.neutral200,
                    color: theme.colors.text,
                })}
            >
                <Container
                    css={(theme) => ({
                        flexFlow: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        width: '100%',
                        gap: 10,
                        padding: 10,
                        borderBottom: `1px solid ${theme.colors.neutral300}`,
                    })}
                >
                    <LayerBlendModeField />
                    <LayerOpacityField />
                </Container>

                <Box
                    css={(theme) => ({
                        height: '100%',
                        width: '100%',
                        padding: 10,
                        overflowY: 'auto',

                        '::-webkit-scrollbar': {
                            width: 10,
                            backgroundColor: theme.colors.neutral100,
                        },
                        '::-webkit-scrollbar-track': {
                            backgroundColor: theme.colors.neutral100,
                        },
                        '::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.colors.neutral300,
                        },
                        borderBottom: `1px solid ${theme.colors.neutral300}`,
                    })}
                >
                    <LayerColumn />
                </Box>
                <Box>
                    <Container
                        css={{
                            width: '100%',
                            padding: 5,
                            gap: 5,
                        }}
                    >
                        <LayerCreateButton>
                            <IconButton variant="translucent">
                                <AddToPhotosIcon />
                            </IconButton>
                        </LayerCreateButton>
                        <LayerDeleteButton>
                            <IconButton variant="translucent">
                                <DeleteForeverIcon />
                            </IconButton>
                        </LayerDeleteButton>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
};
