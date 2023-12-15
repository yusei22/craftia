import { MenuItem } from '@szhsin/react-menu';
import Typography from 'components/atoms/Typography';
import { BLEND_MODE_LABEL, LAYER_BLEND_MODE_VALUE } from 'consts';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useCallbackOnSprites } from 'hooks/sprites/useCallbackOnSprites';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';
import { BlendMode } from 'types';

type BlendModeOption = {
    value: BlendMode;
    label: string;
};

const options: BlendModeOption[] = LAYER_BLEND_MODE_VALUE.map((value) => ({
    value,
    label: BLEND_MODE_LABEL[value],
}));

export const LayerBlendModeMenus = () => {
    const setSpriteIds = useCallbackOnSprites();
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();

    const setBlendMode = (blendMode: BlendMode) => {
        const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);

        setSpriteIds(activeIds, (sprite) =>
            sprite.setSpritePrefs((curPrefs) => ({
                ...curPrefs,
                blendMode: blendMode,
            }))
        );
    };

    return (
        <>
            {options.map(({ value, label }) => (
                <MenuItem
                    onClick={() => {
                        setBlendMode(value);
                    }}
                    key={value}
                    css={{
                        width: '100%',
                    }}
                >
                    <Typography variant="small">{label}</Typography>
                </MenuItem>
            ))}
        </>
    );
};
