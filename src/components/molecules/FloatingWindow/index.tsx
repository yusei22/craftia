import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDrag } from '@use-gesture/react';
import React, { useState } from 'react';
import IconButton from 'components/atoms/IconButton';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';

export type FloatingWindowProps = {
    children?: React.ReactNode;
    show?: boolean;
    title?: string;
    width?: number;
    height?: number;
    className?: string;
    initialLoc?: [number, number];
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

const FloatingWindow = ({ show = true, initialLoc, ...props }: FloatingWindowProps) => {
    const [[x, y], setMovementCoord] = useState(initialLoc || [0, 0]);
    const bind = useDrag(
        ({ delta: [deltaX, deltaY] }) => {
            setMovementCoord([x + deltaX, y + deltaY]);
        },
        {
            preventDefault: true,
        }
    );
    if (!show) return null;
    return (
        <>
            <Wrapper
                style={{ transform: `translate(${x}px, ${y}px)` }}
                css={(theme) => ({
                    width: props.width,
                    boxShadow: '0 0 35px 0 rgba(0, 0, 0, .2)',
                    position: 'absolute',
                    zIndex: 10000,
                    backgroundColor: theme.colors.neutral100,
                })}
                className={props.className}
            >
                <Container
                    css={(theme) => ({
                        justifyContent: 'space-between',
                        width: '100%',
                        height: 33,
                        padding: '0px 8px',
                        backgroundColor: theme.colors.primary300,
                        boxSizing: 'border-box',
                        touchAction: 'none',
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.text,
                    })}
                    {...bind()}
                >
                    {props.title}
                    <IconButton
                        variant="transparent"
                        css={(theme) => ({
                            color: theme.colors.text,
                            borderRadius: 0,
                            padding: 5,
                        })}
                        onClick={props.onClose}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </Container>
                <Box width={'100%'} height={props.height}>
                    {props.children}
                </Box>
            </Wrapper>
        </>
    );
};
export default FloatingWindow;
