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
            <Container
                {...props}
                css={{
                    gap: 10,
                }}
            >
                <Button
                    variant="primary"
                    onClick={onConsent}
                    css={{
                        width: 100,
                    }}
                >
                    決定
                </Button>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    css={{
                        width: 100,
                    }}
                >
                    キャンセル
                </Button>
            </Container>
        </>
    );
};
