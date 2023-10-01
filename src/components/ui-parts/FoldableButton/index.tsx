import React, { memo } from 'react';
import Button from 'components/ui-elements/Button';
import Flex from 'components/ui-elements/Flex';
import Text from 'components/ui-elements/Text';

type FoldableButtonProps = {
    icon: React.ReactNode;
    text: string;
    isActive: boolean;
    paddingSideMobile?: number;
    paddingSide?: number;
    heightMobile?: number;
    height?: number;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FoldableButton = memo(
    ({
        paddingSideMobile = 8,
        paddingSide = 15,
        heightMobile = 28,
        height = 30,
        ...props
    }: FoldableButtonProps) => {
        return (
            <>
                <Button
                    $backgroundColor={props.isActive ? 'primaryDark' : 'none'}
                    $height={{ base: heightMobile + 'px', sm: height + 'px' }}
                    $width={'auto'}
                    $paddingLeft={{ base: paddingSideMobile + 'px', sm: paddingSide + 'px' }}
                    $paddingRight={{ base: paddingSideMobile + 'px', sm: paddingSide + 'px' }}
                    $paddingBottom={0}
                    $paddingTop={0}
                    $borderRadius={{ base: heightMobile / 2 + 'px', sm: height / 2 + 'px' }}
                    $pseudoClass={{
                        hover: {
                            $backgroundColor: props.isActive ? 'primaryDark' : 'white',
                        },
                    }}
                    onClick={props.onClick}
                >
                    <Flex
                        $justifyContent={'center'}
                        $alignItems={'center'}
                        $height={'100%'}
                        $width={'100%'}
                    >
                        <Flex
                            $display={{ base: 'flex', sm: 'none' }}
                            $justifyContent={'center'}
                            $alignItems={'center'}
                            $height={'100%'}
                            $width={'100%'}
                        >
                            {props.icon}
                        </Flex>
                        <Text
                            $color={props.isActive ? 'white' : 'text'}
                            $display={{ base: 'none', sm: 'block' }}
                            $fontSize={'small'}
                        >
                            {props.text}
                        </Text>
                    </Flex>
                </Button>
            </>
        );
    }
);
export default FoldableButton;
