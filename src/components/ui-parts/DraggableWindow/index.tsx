import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDrag } from '@use-gesture/react';
import React, { useState } from 'react';
import Box from 'components/ui-elements/Box';
import Flex from 'components/ui-elements/Flex';
import Text from 'components/ui-elements/Text';
import { theme } from 'themes';
import type { Responsive } from 'types';

type DraggableWindowProps = {
    show: boolean;
    contentWidth?: Responsive<string>;
    contentHeight?: Responsive<string>;
    children?: React.ReactNode;
    title?: string;
    onClose?: () => any;
};

const DraggableWindow = (props: DraggableWindowProps) => {
    const [[x, y], setMovementCoord] = useState([0, 0]);

    const bind = useDrag(
        ({ delta: [deltaX, deltaY] }) => {
            setMovementCoord([x + deltaX, y + deltaY]);
        },
        {
            preventDefault: true,
        }
    );
    if (!props.show) return null;
    return (
        <>
            <Box
                $width={props.contentWidth}
                $boxShadow={'0 0 35px 0 rgba(0, 0, 0, .2)'}
                style={{ transform: `translate(${x}px, ${y}px)` }}
            >
                <Box
                    $display={'block'}
                    $touchAction={'none'}
                    $backgroundColor={'secondary'}
                    $height={'30px'}
                    {...bind()}
                >
                    <Flex
                        $height={'100%'}
                        $justifyContent={'space-between'}
                        $alignItems={'center'}
                        $paddingLeft={2}
                        $paddingRight={2}
                    >
                        <Text $fontSize={'medium'} $color={'white'}>
                            {props.title}
                        </Text>
                        <Flex onClick={props.onClose} $alignItems={'center'}>
                            <HighlightOffIcon sx={{ color: theme.colors['white'] }} />
                        </Flex>
                    </Flex>
                </Box>
                <Box $display={'block'} $height={props.contentHeight}>
                    {props.children}
                </Box>
            </Box>
        </>
    );
};
export default DraggableWindow;
