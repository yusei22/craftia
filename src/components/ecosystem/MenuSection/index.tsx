import { Interpolation, Theme } from '@emotion/react';
import { Menu, MenuButton } from '@szhsin/react-menu';
import React from 'react';
import { ImportMenus } from './ImportMenus';
import { EditMenus } from 'components/ecosystem/MenuSection/EditMenus';
import { FileMenus } from 'components/ecosystem/MenuSection/FileMenus';
import { FilterMenus } from 'components/ecosystem/MenuSection/FilterMenus';
import { LayerMenus } from 'components/ecosystem/MenuSection/LayerMenus/LayerMenus';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';

type MenuSectionProps = {
    width?: string | number;
    height?: string | number;
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
    ':hover': {
        backgroundColor: theme.colors.translucentPale,
    },
    ':active': {
        backgroundColor: theme.colors.translucentPale,
    },
});
export const MenuSection = ({ width, height }: MenuSectionProps) => {
    return (
        <Container
            css={(theme) => ({
                width: width,
                height: height,
                padding: '0px 10px',
                justifyContent: 'start',
                backgroundColor: theme.colors.neutral100,
            })}
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
    );
};
