import {
    FocusableItem,
    MenuAlign,
    MenuPosition,
    ControlledMenu,
    useClick,
    useMenuState,
} from '@szhsin/react-menu';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import { RGBColorAtom } from 'dataflow/colors/RGBColorAtom';
import { portalAtom } from 'dataflow/portals/portalAtom';

type ColorToolProps = {
    className?: string;
    align?: MenuAlign;
    position?: MenuPosition;
};

const WheelColorPicker = dynamic(() => import('../../Colors/WheelColorPicker'), {
    ssr: false,
});

export const ColorTool = (props: ColorToolProps) => {
    const ref = useRef(null);
    const [menuState, toggleMenu] = useMenuState({ transition: true });
    const anchorProps = useClick(menuState.state, toggleMenu);

    const rgb = useRecoilValue(RGBColorAtom);
    const portal = useRecoilValue(portalAtom);

    return (
        <>
            <div
                ref={ref}
                css={(theme) => ({
                    padding: 0,
                    width: 25,
                    height: 25,
                    color: theme.colors.text,
                    fontSize: theme.fontSize.md,
                    border: `2px solid ${theme.colors.neutral300}`,
                    ':hover': {
                        border: `2px solid ${theme.colors.neutral400}`,
                    },
                    ':active': {
                        border: `2px solid ${theme.colors.neutral500}`,
                    },
                    backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
                })}
                className={props.className}
                {...anchorProps}
            />
            <ControlledMenu
                {...menuState}
                anchorRef={ref}
                onClose={() => toggleMenu(false)}
                portal={{
                    target: portal,
                }}
                css={(theme) => ({
                    '.szh-menu': {
                        zIndex: 1500,
                        padding: 0,
                        backgroundColor: theme.colors.neutral200,
                        boxShadow: `0px 1px 30px rgb(0,0,0,0.1)`,
                        borderRadius: 20,
                        border: `2px solid${theme.colors.neutral300}`,
                        overflow: 'hidden',
                    },
                    '.szh-menu__item': {
                        backgroundColor: theme.colors.neutral200,
                        padding: 0,
                    },
                })}
                overflow={'auto'}
                direction={'right'}
                position={props.position}
                arrow
            >
                <FocusableItem>
                    {({ ref }) => (
                        <Wrapper ref={ref}>
                            <Container
                                css={{
                                    width: '100%',
                                    height: '100%',
                                    flexFlow: 'column',
                                }}
                            >
                                <Container
                                    css={(theme) => ({
                                        width: '100%',
                                        fontSize: theme.fontSize.sm,
                                        borderBottom: `1px solid ${theme.colors.neutral300}`,
                                        color: theme.colors.text,
                                        padding: 7,
                                    })}
                                >
                                    カラーを選択
                                </Container>
                                <WheelColorPicker
                                    wheelRadius={200}
                                    css={{
                                        padding: '10px 20px',
                                    }}
                                />
                            </Container>
                        </Wrapper>
                    )}
                </FocusableItem>
            </ControlledMenu>
        </>
    );
};
