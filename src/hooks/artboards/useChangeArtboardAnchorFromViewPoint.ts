import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { getArtBoardNormalizedPointFromViewPoint } from 'application/utils';
import { artboardTransformAtom } from 'dataflow';

const useChangeArtboardAnchorFromViewPoint = () => {
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);

    return useCallback((newAnchorViewPoint: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const newAnchor = getArtBoardNormalizedPointFromViewPoint(
                    anchor,
                    location,
                    scale,
                    rotation,
                    newAnchorViewPoint
                );
                return {
                    anchor: newAnchor,
                    location: newAnchorViewPoint,
                    scale,
                    rotation,
                };
            });
        } else {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const newAnchor = getArtBoardNormalizedPointFromViewPoint(
                    anchor,
                    location,
                    scale,
                    rotation,
                    newAnchorViewPoint
                );

                return {
                    anchor: newAnchor,
                    location: location,
                    scale: scale,
                    rotation: rotation,
                };
            });
        }
    }, []);
};
export { useChangeArtboardAnchorFromViewPoint };
