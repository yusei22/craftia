import { MenuItem } from '@szhsin/react-menu';
import Typography from 'components/atoms/Typography';
import { ImageImportButton } from 'components/organisms/Imports/ImageImportButton';

export const ImportMenus = () => {
    return (
        <MenuItem>
            <ImageImportButton>
                <Typography variant="small">画像を挿入</Typography>
            </ImageImportButton>
        </MenuItem>
    );
};
