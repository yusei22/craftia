import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Sprite, SpritePrefs, searchSpritesFromIDs } from 'application/sprites/Sprite';
import Container from 'components/layout/Container';
import { Selector, SelectorOptions } from 'components/molecules/Selector';
import { BLEND_MODE_LABEL, LAYER_BLEND_MODE_VALUE } from 'consts';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useCallbackOnSprites } from 'hooks/sprites/useCallbackOnSprites';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';
import { BlendMode } from 'types';

const createOptions = (blendModes: readonly BlendMode[]) => {
    return blendModes.map((value) => ({
        value,
        label: BLEND_MODE_LABEL[value],
    }));
};

const options: SelectorOptions<string> = createOptions(LAYER_BLEND_MODE_VALUE);

export type LayerBlendModeFieldProps = {
    className?: string;
};

const useLayerBlendModeSetter = () => {
    const setSpriteIds = useCallbackOnSprites();
    const saveSpriteTree = useSpriteTreeSaver();
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();

    return useCallback((blendMode: BlendMode) => {
        const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);

        setSpriteIds(activeIds, (sprite) =>
            sprite.setSpritePrefs((curPrefs) => ({
                ...curPrefs,
                blendMode,
            }))
        );
        saveSpriteTree();
    }, []);
};

const useLayerBlendModeGetter = () => {
    const getSpriteTreeSync = useRecoilValueSyncReader<Sprite<SpritePrefs>[]>();

    return useCallback((activeSpriteIds: string[]) => {
        const blendModes = searchSpritesFromIDs(
            getSpriteTreeSync(spriteTreeAtom),
            activeSpriteIds
        ).map((sprite) => sprite.prefs.blendMode);

        return blendModes[0] ?? 'source-over';
    }, []);
};

export const LayerBlendModeField = ({ className }: LayerBlendModeFieldProps) => {
    const setBlendMode = useLayerBlendModeSetter();
    const getBlendMode = useLayerBlendModeGetter();

    const activeSpriteId = useRecoilValue(activeSpriteIdsAtom);
    const [selected, setSelected] = useState<BlendMode>('source-over');

    useEffect(() => {
        setSelected(getBlendMode(activeSpriteId));
    }, [activeSpriteId]);

    const onChange = (newVal: string) => {
        if (!LAYER_BLEND_MODE_VALUE.includes(newVal as BlendMode)) {
            console.warn(
                'レイヤーのブレンドモード値として無効なものが設定されました。この値を無視します。'
            );
        }
        setBlendMode(newVal as BlendMode);
        setSelected(newVal as BlendMode);
    };

    return (
        <>
            <Container
                className={className}
                css={{
                    alignItems: 'center',
                }}
            >
                <Selector options={options} defaultValue={selected} onChange={onChange} />
            </Container>
        </>
    );
};
