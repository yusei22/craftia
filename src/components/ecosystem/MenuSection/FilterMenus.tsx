import { MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import { BilateralButton } from '../../organisms/Filters/Bilateral';
import { GaussianBlurButton } from '../../organisms/Filters/Gaussian';
import { IllustrationButton } from '../../organisms/Filters/Illustration';
import { InversionButton } from '../../organisms/Filters/Inversion';
import { SobelButton } from '../../organisms/Filters/Sobel';
import { UnsharpMaskingButton } from '../../organisms/Filters/UnsharpMasking';
import Typography from 'components/atoms/Typography';
import { AmitoneButton } from 'components/organisms/Filters/Amitone';
import { BinarizationButton } from 'components/organisms/Filters/Binarization';

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
            <MenuItem>
                <BinarizationButton>
                    <Typography variant="small">二値化</Typography>
                </BinarizationButton>
            </MenuItem>
            <MenuItem>
                <AmitoneButton>
                    <Typography variant="small">網トーン</Typography>
                </AmitoneButton>
            </MenuItem>
        </>
    );
};
