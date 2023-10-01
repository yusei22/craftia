import ColorLensIcon from '@mui/icons-material/ColorLens';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HomeIcon from '@mui/icons-material/Home';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from 'components/ui-elements/Box';
import Flex from 'components/ui-elements/Flex';
import FoldableButton from 'components/ui-parts/FoldableButton';
import { theme } from 'themes';

const Header = () => {
    return (
        <>
            <Flex
                $justifyContent={'start'}
                $alignItems={'center'}
                $width={'100%'}
                $backgroundColor={'primaryLight'}
                $padding={'8px'}
                $borderRadius={'30px'}
            >
                <Box $paddingRight={1}>
                    <FoldableButton
                        icon={
                            <FileDownloadIcon
                                sx={{ color: theme.colors['text'] }}
                                fontSize="small"
                            />
                        }
                        isActive={true}
                        text="ファイル"
                    />
                </Box>
                <Box $paddingRight={1}>
                    <FoldableButton
                        icon={<HomeIcon sx={{ color: theme.colors['text'] }} fontSize="small" />}
                        isActive={false}
                        text="ホーム"
                    />
                </Box>
                <Box $paddingRight={1}>
                    <FoldableButton
                        icon={
                            <InsertDriveFileIcon
                                sx={{ color: theme.colors['text'] }}
                                fontSize="small"
                            />
                        }
                        isActive={false}
                        text="レイヤー"
                    />
                </Box>

                <Box $paddingRight={1}>
                    <FoldableButton
                        icon={
                            <ColorLensIcon sx={{ color: theme.colors['text'] }} fontSize="small" />
                        }
                        isActive={false}
                        text="描画"
                    />
                </Box>
            </Flex>
        </>
    );
};
export { Header };
