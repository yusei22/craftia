import Button, { ButtonProps } from '../Button';

const IconButton = ({ css, ...props }: ButtonProps) => {
    return (
        <Button
            css={[
                css,
                (theme) => ({
                    padding: theme.space.sm,
                    fontSize: '0px',
                    borderRadius: '50%',
                }),
            ]}
            {...props}
        />
    );
};
export default IconButton;
