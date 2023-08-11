import React, { useState } from "react";
import { useDrag } from '@use-gesture/react'
import { Color, FontSize } from 'utils/styles'
import { theme } from 'themes'
import type { Responsive } from 'types'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex';
import Text from 'components/atoms/Text';


type DraggableWindowProps = {
    show: boolean
    width: Responsive<string>
    headerHeight: Responsive<string>
    headerColor?: Responsive<Color>
    children?: React.ReactNode
    title?: string
    titleSize?: Responsive<FontSize>
    titleColor?: Responsive<Color>
    closeIconColor?: keyof typeof theme.colors
    onClose?: () => any
}

const DraggableWindow = (props: DraggableWindowProps) => {

    const [[x, y], setMovementCoord] = useState([0, 0]);

    const bind = useDrag(({ delta: [deltaX, deltaY] }) => {
        setMovementCoord([x + deltaX, y + deltaY])
    }, {
        preventDefault: true,
    })
    if (!props.show) return null;
    return (
        <>
            <Box $width={props.width} style={{ transform: `translate(${x}px, ${y}px)` }} $boxShadow={'0 0 35px 0 rgba(0, 0, 0, .2)'}>
                <Box
                    $display={'block'}
                    $touchAction={'none'}
                    $backgroundColor={props.headerColor}
                    $height={props.headerHeight}
                    {...bind()}
                >
                    <Flex
                        $height={'100%'}
                        $justifyContent={'space-between'}
                        $alignItems={'center'}
                        $paddingLeft={2}
                        $paddingRight={2}
                    >
                        <Text $fontSize={props.titleSize} $color={props.titleColor}>
                            {props.title}
                        </Text>
                        <Flex onClick={props.onClose} $alignItems={'center'}>
                            <HighlightOffIcon sx={{ color: theme.colors[props.closeIconColor ?? 'text'] }} />
                        </Flex>
                    </Flex>
                </Box>
                <Box $display={'block'}>
                    {props.children}
                </Box>
            </Box>
        </>
    )
}
export default DraggableWindow