import React from 'react';
import Button from 'components/atoms/Button';
import Container, { ContainerProps } from 'components/layout/Container';

export type ConfirmButtonsProps = ContainerProps & {
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
    onConsent?: React.MouseEventHandler<HTMLButtonElement>;
};
export const ConfirmButtons = ({ onConsent, onCancel, ...props }: ConfirmButtonsProps) => {
    return (
        <>
            <Container {...props}>
                <Button
                    onClick={onConsent}
                    css={{
                        margin: '0px 5px',
                    }}
                >
                    決定
                </Button>
                <Button
                    onClick={onCancel}
                    css={{
                        margin: '0px 5px',
                    }}
                >
                    キャンセル
                </Button>
            </Container>
        </>
    );
};
