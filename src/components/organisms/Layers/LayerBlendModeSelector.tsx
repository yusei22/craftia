import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sprite, SpritePrefs, searchSpritesFromIDs } from 'application/sprites/Sprite';
import { BLEND_MODE_LABEL, LAYER_BLEND_MODE_VALUE } from 'consts';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
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

const getSpritesBlendMode = (ids: string[], spriteTree: Sprite<SpritePrefs>[]) => {
    return searchSpritesFromIDs(spriteTree, ids).map((sprite) => sprite.prefs.blendMode);
};

export const LayerBlendModeSelector = () => {
    const getSpriteTreeSync = useRecoilValueSyncReader<Sprite<SpritePrefs>[]>();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const activeSpriteId = useRecoilValue(activeSpriteIdsAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();

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
                id="penBlendModeSelector"
                css={(theme) => ({
                    width: '180px',
                    marginTop: '5px',
                    fontSize: theme.fontSize.sm,
                })}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: '#F3F3F3',
                        primary: '#5AA2AE',
                    },
                })}
                isSearchable={false}
                menuPosition={'fixed'}
                options={options}
                value={selected}
                onChange={(value) => {
                    const activeId = getActiveSpriteIds(activeSpriteIdsAtom)[0];
                    setSpriteTree((sprites) =>
                        sprites.map((sprite) =>
                            sprite.prefs.id === activeId
                                ? sprite.setSpritePrefs((prefs) => ({
                                      ...prefs,
                                      blendMode: value?.value ?? prefs.blendMode,
                                  }))
                                : sprite
                        )
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
