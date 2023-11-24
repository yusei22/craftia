import { MenuItem, SubMenu, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import { LayerCreateButton } from '../../../organisms/Layers/LayerCreateButton';
import { LayerDeleteButton } from '../../../organisms/Layers/LayerDeleteButton';
import { LayerBlendModeMenus } from './LayerBlendModeMenus';
import Typography from 'components/atoms/Typography';
import '@szhsin/react-menu/dist/index.css';

export const LayerMenus = () => {
    return (
        <>
            <MenuHeader>レイヤー操作</MenuHeader>
            <MenuItem>
                <LayerCreateButton
                    css={{
                        width: '100%',
                    }}
                >
                    <Typography variant="small">新規レイヤーを作成</Typography>
                </LayerCreateButton>
            </MenuItem>
            <MenuItem>
                <LayerDeleteButton
                    css={{
                        width: '100%',
                    }}
                >
                    <Typography variant="small">レイヤーを削除</Typography>
                </LayerDeleteButton>
            </MenuItem>
            <MenuDivider />
            <MenuHeader>効果</MenuHeader>
            <SubMenu label={<Typography variant="small">ブレンドモード</Typography>}>
                <LayerBlendModeMenus />
            </SubMenu>
        </>
    );
};
