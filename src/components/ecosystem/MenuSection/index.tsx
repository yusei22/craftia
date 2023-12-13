import { Interpolation, Theme } from '@emotion/react';
import { Menu, MenuButton } from '@szhsin/react-menu';
import React from 'react';
import { ImportMenus } from './ImportMenus';
import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import { EditMenus } from 'components/ecosystem/MenuSection/EditMenus';
import { FileMenus } from 'components/ecosystem/MenuSection/FileMenus';
import { FilterMenus } from 'components/ecosystem/MenuSection/FilterMenus';
import { LayerMenus } from 'components/ecosystem/MenuSection/LayerMenus/LayerMenus';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import { ThemeButton } from 'components/organisms/Displays/ThemeButton';

import '@szhsin/react-menu/dist/transitions/slide.css';
import '@szhsin/react-menu/dist/index.css';

type MenuSectionProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
};

const MenuBtnWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Wrapper css={{ marginLeft: 10 }}>{children}</Wrapper>;
};
const menuButtonCss: Interpolation<Theme> = (theme) => ({
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    backgroundColor: '#0000',
    padding: '3px 6px',
    border: 'none',
    borderRadius: 5,
    whiteSpace: 'nowrap',
    ':hover': {
        backgroundColor: theme.colors.translucentPale,
    },
    ':active': {
        backgroundColor: theme.colors.translucentPale,
    },
});
export const MenuSection = ({ width, height, className }: MenuSectionProps) => {
    return (
        <Container
            css={(theme) => ({
                width: width,
                height: height,
                padding: '0px 10px',
                justifyContent: 'space-between',
                backgroundColor: theme.colors.neutral100,
            })}
            className={className}
        >
            <Container
                css={{
                    justifyContent: 'start',
                    width: '100%',
                    height: '100%',
                }}
            >
                <MenuBtnWrapper>
                    <Menu menuButton={<MenuButton css={menuButtonCss}>ファイル</MenuButton>}>
                        <FileMenus />
                    </Menu>
                </MenuBtnWrapper>
                <MenuBtnWrapper>
                    <Menu menuButton={<MenuButton css={menuButtonCss}>編集</MenuButton>}>
                        <EditMenus />
                    </Menu>
                </MenuBtnWrapper>
                <MenuBtnWrapper>
                    <Menu menuButton={<MenuButton css={menuButtonCss}>フィルタ</MenuButton>}>
                        <FilterMenus />
                    </Menu>
                </MenuBtnWrapper>
                <MenuBtnWrapper>
                    <Menu menuButton={<MenuButton css={menuButtonCss}>レイヤー</MenuButton>}>
                        <LayerMenus />
                    </Menu>
                </MenuBtnWrapper>
                <MenuBtnWrapper>
                    <Menu menuButton={<MenuButton css={menuButtonCss}>挿入</MenuButton>}>
                        <ImportMenus />
                    </Menu>
                </MenuBtnWrapper>
            </Container>
            <Container
                css={{
                    height: '100%',
                }}
            >
                <ThemeButton>
                    <Button css={{ padding: 0 }}>
                        <Typography variant="small" css={{ whiteSpace: 'nowrap' }}>
                            テーマ
                        </Typography>
                    </Button>
                </ThemeButton>
            </Container>
        </Container>
    );
};
