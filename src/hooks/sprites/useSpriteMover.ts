import { useCallback } from 'react';
import { useCallbackOnSprites } from './useCallbackOnSprites';
import { Vec2 } from 'application/core/units';
import { stageZoomSelector } from 'dataflow/stage/stageZoomSelector';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useSpriteMover = () => {
    const getStageZoomSync = useRecoilValueSyncReader<number>();
    const callbackOnSprites = useCallbackOnSprites();

    const moveSprite = useCallback((targetSpriteIds: string[], delta: Vec2) => {
        const _delta = delta.times(1 / getStageZoomSync(stageZoomSelector));
        callbackOnSprites(targetSpriteIds, (sprite) =>
            sprite.setSpritePrefs((curPrefs) => ({
                ...curPrefs,
                globalLocation: curPrefs.globalLocation.add(_delta),
            }))
        );
    }, []);

    return moveSprite;
};
