import { useCallback } from 'react';
import { useSpritesSetterIds } from './useSritePrefsSetter';
import { Vec2 } from 'application/core/units';
import { stageZoomSelector } from 'dataflow/stage/stageZoomSelector';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useSpriteMover = () => {
    const getStageZoomSync = useRecoilValueSyncReader<number>();
    const hitSpritesFromIds = useSpritesSetterIds();

    const moveSprite = useCallback((targetSpriteIds: string[], delta: Vec2) => {
        const _delta = delta.times(1 / getStageZoomSync(stageZoomSelector));
        hitSpritesFromIds(targetSpriteIds, (sprite) =>
            sprite.setSpritePrefs((curPrefs) => ({
                ...curPrefs,
                globalLocation: curPrefs.globalLocation.add(_delta),
            }))
        );
    }, []);

    return moveSprite;
};
