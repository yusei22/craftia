import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilValue } from 'recoil';
import { Sprite, SpritePrefs, searchSpritesFromIDs } from 'application/sprites/Sprite';
import { BLEND_MODE_LABEL, LAYER_BLEND_MODE_VALUE } from 'consts';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useCallbackOnSprites } from 'hooks/sprites/useCallbackOnSprites';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';
import { defaultTheme } from 'theme';
import { BlendMode } from 'types';

type BlendModeOption = {
    value: BlendMode;
    label: string;
};

const options: BlendModeOption[] = LAYER_BLEND_MODE_VALUE.map((value) => ({
    value,
    label: BLEND_MODE_LABEL[value],
}));

const getSpritesBlendMode = (ids: string[], spriteTree: Sprite<SpritePrefs>[]) => {
    return searchSpritesFromIDs(spriteTree, ids).map((sprite) => sprite.prefs.blendMode);
};
export type LayerBlendModeSelectorProps = {
    className?: string;
};

export const LayerBlendModeSelector = ({ className }: LayerBlendModeSelectorProps) => {
    const setSpriteIds = useCallbackOnSprites();
    const getSpriteTreeSync = useRecoilValueSyncReader<Sprite<SpritePrefs>[]>();
    const saveSpriteTree = useSpriteTreeSaver();
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();

    const activeSpriteId = useRecoilValue(activeSpriteIdsAtom);

    const [selected, setSelected] = useState<BlendModeOption>({
        value: 'source-over',
        label: BLEND_MODE_LABEL['source-over'],
    });

    const getValue = (activeSpriteIds: string[]) => {
        const spritesBlendMode = getSpritesBlendMode(
            activeSpriteIds,
            getSpriteTreeSync(spriteTreeAtom)
        );
        return {
            value: spritesBlendMode[0],
            label: BLEND_MODE_LABEL[spritesBlendMode[0]],
        };
    };
    useEffect(() => {
        setSelected(getValue(activeSpriteId));
    }, [activeSpriteId]);

    return (
        <>
            <Select<BlendModeOption>
                className={className}
                instanceId="layerBlendModeSelector"
                id="layerBlendModeSelector"
                css={(theme) => ({
                    width: '180px',
                    marginTop: '5px',
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.neutral900,
                })}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,

                        primary25: defaultTheme.colors.neutral200,
                        primary: defaultTheme.colors.neutral600,
                    },
                })}
                isSearchable={false}
                menuPosition={'fixed'}
                options={options}
                value={selected}
                onChange={(value) => {
                    const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);

                    setSpriteIds(activeIds, (sprite) =>
                        sprite.setSpritePrefs((curPrefs) => ({
                            ...curPrefs,
                            blendMode: value?.value || curPrefs.blendMode,
                        }))
                    );
                    setSelected((curVal) => ({
                        value: value?.value ?? curVal.value,
                        label: BLEND_MODE_LABEL[value?.value ?? curVal.value],
                    }));
                    saveSpriteTree();
                }}
            />
        </>
    );
};
