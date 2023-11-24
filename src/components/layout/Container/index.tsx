import { ClassAttributes, HTMLAttributes } from 'react';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & ClassAttributes<HTMLDivElement>;

const Container = ({ ...props }: ContainerProps) => {
    return (
        <div
            css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content',
            }}
            {...props}
        />
    );
};

export default Container;
