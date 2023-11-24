import { MenuDivider, MenuHeader, MenuItem } from '@szhsin/react-menu';
import { ExportButton, ExportButtonProps } from '../../organisms/Files/ExportButton';
import Typography from 'components/atoms/Typography';
import '@szhsin/react-menu/dist/index.css';
import Container from 'components/layout/Container';
import { OpenButton } from 'components/organisms/Files/OpenButton';

type StyledExportButtonProps = ExportButtonProps & {
    title?: string;
    subtitle?: string;
};
const StyledExportButton = ({ title, subtitle, ...props }: StyledExportButtonProps) => {
    return (
        <ExportButton
            {...props}
            css={{
                width: '100%',
            }}
        >
            <Container
                css={{
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="small">{title}</Typography>
                <Typography
                    variant="extraSmall"
                    css={(theme) => ({
                        color: theme.colors.neutral600,
                    })}
                >
                    {subtitle}
                </Typography>
            </Container>
        </ExportButton>
    );
};

export const FileMenus = () => {
    return (
        <>
            <MenuHeader>書き出し</MenuHeader>
            <MenuItem>
                <StyledExportButton
                    exportFormat="image/png"
                    exportName="project.png"
                    title="PNG"
                    subtitle=".png"
                />
            </MenuItem>
            <MenuItem>
                <StyledExportButton
                    exportFormat="image/jpg"
                    exportName="project.jpg"
                    title="JPG"
                    subtitle=".jpg"
                />
            </MenuItem>
            <MenuItem>
                <StyledExportButton
                    exportFormat="image/webp"
                    exportName="project.webp"
                    title="Webp"
                    subtitle=".webp"
                />
            </MenuItem>
            <MenuDivider />
            <MenuHeader>開く</MenuHeader>
            <MenuItem>
                <OpenButton>
                    <Typography variant="small">画像を開く</Typography>
                </OpenButton>
            </MenuItem>
        </>
    );
};
