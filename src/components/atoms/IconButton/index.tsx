import Button, { ButtonProps } from '../Button';

const IconButton = ({ ...props }: ButtonProps) => {
    return (
        <Button
            css={(theme) => ({
                padding: theme.space.sm,
                fontSize: '0px',
                borderRadius: '50%',
            })}
            {...props}
        />
    );
};
export default IconButton;
