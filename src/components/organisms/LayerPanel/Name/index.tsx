import { Sprite } from 'application/sprites/Sprite';
import Typography from 'components/atoms/Typography';

export const LayerName = ({ sprite }: { sprite: Sprite }) => {
    return (
        <Typography
            variant="extraSmall"
            css={(theme) => ({
                color: theme.colors.text,
                marginLeft: 6,
            })}
        >
            {sprite.prefs.name}
        </Typography>
    );
};
