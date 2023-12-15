import Button, { ButtonProps } from '../Button';

const IconButton = ({ ...props }: ButtonProps) => {
    return (
        <Button
            css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 7px',
                borderRadius: '20%',
            }}
            {...props}
        />
    );
};
export default IconButton;
