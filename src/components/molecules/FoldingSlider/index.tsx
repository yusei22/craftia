import {
    FocusableItem,
    MenuAlign,
    MenuPosition,
    ControlledMenu,
    useClick,
    useMenuState,
} from '@szhsin/react-menu';
import { useRef, ChangeEventHandler } from 'react';

type FoldingSliderProps = {
    value?: number;
    setValue?: (n: number) => unknown;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    align?: MenuAlign;
    position?: MenuPosition;
};

export const FoldingSlider = (props: FoldingSliderProps) => {
    const ref = useRef(null);
    const [menuState, toggleMenu] = useMenuState({ transition: true });
    const anchorProps = useClick(menuState.state, toggleMenu);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const v = parseFloat(e.currentTarget.value) || 0;

        props.setValue?.(v);
    };

    return (
        <>
            <button
                ref={ref}
                css={(theme) => ({
                    color: theme.colors.text,
                    backgroundColor: '#0000',
                    fontSize: theme.fontSize.md,
                    padding: '2px',
                    border: 'none',
                    ':hover': {
                        backgroundColor: theme.colors.translucentMedium,
                    },
                    ':active': {
                        backgroundColor: theme.colors.translucentMedium,
                    },
                })}
                className={props.className}
                {...anchorProps}
            >
                ▼
            </button>
            <ControlledMenu
                {...menuState}
                anchorRef={ref}
                onClose={() => toggleMenu(false)}
                css={(theme) => ({
                    ul: {
                        padding: 0,
                        backgroundColor: theme.colors.neutral100,
                        boxShadow: `0px 1px 30px rgb(0,0,0,0.1)`,
                        border: `2px solid${theme.colors.neutral200}`,
                    },
                    li: {
                        padding: '7px',
                        backgroundColor: theme.colors.neutral100,
                    },
                })}
                align={props.align}
                position={props.position}
            >
                <FocusableItem>
                    {({ ref }) => (
                        <input
                            ref={ref}
                            css={{
                                width: '100%',
                            }}
                            type="range"
                            value={props.value}
                            step={props.step}
                            min={props.min}
                            max={props.max}
                            onChange={onChange}
                        />
                    )}
                </FocusableItem>
            </ControlledMenu>
        </>
    );
};
