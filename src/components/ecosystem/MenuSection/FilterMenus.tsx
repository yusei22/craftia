import { MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import { BilateralButton } from '../../organisms/Filters/BilateralButton';
import { GaussianBlurButton } from '../../organisms/Filters/GaussianBlurButton';
import { IllustrationButton } from '../../organisms/Filters/IllustrationButton';
import { InversionButton } from '../../organisms/Filters/InversionButton';
import { SobelButton } from '../../organisms/Filters/SobelButton';
import { UnsharpMaskingButton } from '../../organisms/Filters/UnsharpMaskingButton';

import '@szhsin/react-menu/dist/index.css';
import Typography from 'components/atoms/Typography';

export const FilterMenus = () => {
    return (
        <>
            <MenuHeader>ノイズ除去</MenuHeader>
            <MenuItem>
                <GaussianBlurButton>
                    <Typography variant="small">ガウスぼかし</Typography>
                </GaussianBlurButton>
            </MenuItem>
            <MenuItem>
                <BilateralButton>
                    <Typography variant="small">バイラテラル</Typography>
                </BilateralButton>
            </MenuItem>
            <MenuDivider />
            <MenuHeader>線画抽出</MenuHeader>
            <MenuItem>
                <SobelButton>
                    <Typography variant="small">ソーベル線画抽出</Typography>
                </SobelButton>
            </MenuItem>

            <MenuDivider />
            <MenuHeader>鮮鋭化</MenuHeader>
            <MenuItem>
                <UnsharpMaskingButton>
                    <Typography variant="small">アンシャープマスキング</Typography>
                </UnsharpMaskingButton>
            </MenuItem>
            <MenuDivider />
            <MenuHeader>その他</MenuHeader>
            <MenuItem>
                <InversionButton>
                    <Typography variant="small">ネガポジ反転</Typography>
                </InversionButton>
            </MenuItem>
            <MenuItem>
                <IllustrationButton>
                    <Typography variant="small">イラスト化</Typography>
                </IllustrationButton>
            </MenuItem>
        </>
    );
};
