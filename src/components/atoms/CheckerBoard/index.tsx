import Wrapper, { WrapperProps } from 'components/layout/Wrapper';

export const CheckerBoard = (props: Omit<WrapperProps, 'ref'>) => {
    return (
        <Wrapper
            css={(theme) => ({
                margin: '0px 10px ',
                background: `
                repeating-conic-gradient(
                    #e5e5e5 0% 25%, ${theme.colors.white} 0% 50%
                ) 50% / 15px 15px`,
            })}
            {...props}
        />
    );
};
