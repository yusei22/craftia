import Flex from 'components/layout/Flex';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Button from 'components/atoms/Button';
import React, { memo } from "react";


type FoldableButtonProps = {
    icon: React.ReactNode
    text: string
    isActive: boolean
    height: number
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

const FoldableButton = memo((props: FoldableButtonProps) => {
    return (
        <>
            <Button
                $backgroundColor={props.isActive ? 'primaryDark' : 'white'}
                $height={props.height + 'px'}
                $width={{ base: props.height + 'px', sm: 'auto' }}
                $borderRadius={props.height / 2 + 'px'}
                $pseudoClass={{
                    hover: {
                        $backgroundColor: props.isActive ? 'primaryDark' : 'primaryLight'
                    }
                }}
                onClick={props.onClick}
            >
                <Flex $justifyContent={'center'} $alignItems={'center'} $height={'100%'}>
                    <Box $display={{ base: 'block', sm: 'none' }}>
                        {props.icon}
                    </Box>
                    <Text $color={props.isActive ? 'white' : 'text'} $display={{ base: 'none', sm: 'block' }}>
                        {props.text}
                    </Text>
                </Flex>
            </Button>
        </>
    )
})
export default FoldableButton