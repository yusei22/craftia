import { useDrag } from '@use-gesture/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/joy';
import theme from 'theme';

type FloatingWindowProps = {
    show?: boolean;
    width?: number;
    height?: number;
    children?: React.ReactNode;
    title?: string;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const FloatingWindow = ({ show = true, ...props }: FloatingWindowProps) => {
    const [[x, y], setMovementCoord] = useState([0, 0]);
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
            <div
                style={{ transform: `translate(${x}px, ${y}px)` }}
                css={{
                    display: 'inline-block'
                }}
            >
                <Box width={props.width} boxShadow={'0 0 35px 0 rgba(0, 0, 0, .2)'}>
                    <div css={{ touchAction: 'none', width: '100%', height: '40px' }} {...bind()}>
                        <Box
                            width={'100%'}
                            height={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            paddingLeft={2}
                            paddingRight={2}
                            sx={{
                                backgroundColor: (theme) => theme.vars.palette.primary[400]
                            }}
                        >
                            <Box sx={{
                                color: (theme) => theme.vars.palette.text.whiten,
                                fontSize: (theme) => theme.fontSize.md,
                                fontWeight: (theme) => theme.vars.fontWeight.lg
                            }} >
                                {props.title}
                            </Box>
                            <IconButton
                                onClick={props.onClose}
                                sx={{
                                    ":active": {
                                        backgroundColor: (theme) => theme.vars.palette.primary[600]
                                    },
                                    ":hover": {
                                        backgroundColor: (theme) => theme.vars.palette.primary[500]
                                    }
                                }}>
                                <HighlightOffIcon sx={{ color: '#f5f5f5', }} />
                            </IconButton>
                        </Box>
                    </div>
                    <Box width={'100%'} height={props.height} >
                        {props.children}
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default FloatingWindow;