import { useClick, useMenuState, ControlledMenu } from '@szhsin/react-menu';
import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { ImportMenus } from './ImportMenus';
import { LayerMenus } from './LayerMenus';
import { EditMenus } from 'components/ecosystem/TopMenus/EditMenus';
import { FileMenus } from 'components/ecosystem/TopMenus/FileMenus';
import { FilterMenus } from 'components/ecosystem/TopMenus/FilterMenus';
import Container from 'components/layout/Container';

import '@szhsin/react-menu/dist/transitions/slide.css';
import '@szhsin/react-menu/dist/index.css';
import { portalAtom } from 'dataflow/portals/portalAtom';

const MenuWrapper = ({ children, label }: { children?: React.ReactNode; label?: string }) => {
    const ref = useRef(null);
    const [menuState, toggleMenu] = useMenuState({ transition: true });
    const anchorProps = useClick(menuState.state, toggleMenu);
    const portal = useRecoilValue(portalAtom);

    return (
        <>
            <button
                ref={ref}
                css={(theme) => ({
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
                })}
                {...anchorProps}
            >
                {label}
            </button>
            <ControlledMenu
                {...menuState}
                anchorRef={ref}
                onClose={() => toggleMenu(false)}
                overflow={'auto'}
                css={(theme) => ({
                    '.szh-menu__item--hover': {
                        color: theme.colors.text,
                        backgroundColor: theme.colors.neutral200,
                    },
                    '.szh-menu__item': {
                        color: theme.colors.text,
                    },
                    '.szh-menu__header': {
                        color: theme.colors.neutral700,
                    },
                    color: theme.colors.text,
                    '.szh-menu': {
                        zIndex: 1500,
                        backgroundColor: theme.colors.neutral100,
                        border: `2px solid${theme.colors.neutral200}`,
                        boxShadow: `0px 1px 30px rgb(0,0,0,0.08)`,
                    },
                })}
                portal={{
                    target: portal,
                }}
            >
                {children}
            </ControlledMenu>
        </>
    );
};

export type MenuSectionProps = {
    className?: string;
};

export const MenuSection = ({ className }: MenuSectionProps) => {
    return (
        <Container
            css={(theme) => ({
                width: '100%',
                height: '100%',
                justifyContent: 'start',
                backgroundColor: theme.colors.neutral200,
                overflowX: 'auto',

                scrollbarWidth: 'none',
                '::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': {
                    display: 'none',
                },
                gap: 10,
            })}
            className={className}
        >
            <MenuWrapper label="ファイル">
                <FileMenus />
            </MenuWrapper>
            <MenuWrapper label="編集">
                <EditMenus />
            </MenuWrapper>
            <MenuWrapper label="フィルタ">
                <FilterMenus />
            </MenuWrapper>
            <MenuWrapper label="レイヤー">
                <LayerMenus />
            </MenuWrapper>
            <MenuWrapper label="挿入">
                <ImportMenus />
            </MenuWrapper>
        </Container>
    );
};
