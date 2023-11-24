import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDrag } from '@use-gesture/react';
import React, { useState } from 'react';
import IconButton from 'components/atoms/IconButton';
import Typography from 'components/atoms/Typography';
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
                css={{
                    width: props.width,
                    boxShadow: '0 0 35px 0 rgba(0, 0, 0, .2)',
                    position: 'absolute',
                    zIndex: 10000,
                }}
                className={props.className}
            >
                <Container
                    css={(theme) => ({
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '40px',
                        padding: '0px 8px',
                        backgroundColor: theme.colors.primary700,
                        boxSizing: 'border-box',
                        touchAction: 'none',
                    })}
                    {...bind()}
                >
                    <Typography
                        variant="small"
                        css={(theme) => ({
                            color: theme.colors.white,
                        })}
                    >
                        {props.title}
                    </Typography>
                    <IconButton
                        variant="translucent"
                        css={(theme) => ({
                            color: theme.colors.white,
                            padding: '5px',
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
