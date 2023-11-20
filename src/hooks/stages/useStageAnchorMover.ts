import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { rotatePoint } from 'application/utils/BoardGeometry';
import { stageTransformAtom } from 'dataflow';

export const useStageAnchorMover = () => {
    const setStageTrans = useSetRecoilState(stageTransformAtom);

    return useCallback((newAnchor: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setStageTrans(({ anchor, location, scale, rotation }) => {
                const AnchorsDiff = new Vec2(
                    (newAnchor.x - anchor.x) * scale.x,
                    (newAnchor.y - anchor.y) * scale.y
                );

                const newLocation = rotatePoint(location, location.add(AnchorsDiff), rotation);
                return {
                    anchor: newAnchor,
                    location: newLocation,
                    scale,
                    rotation,
                };
            });
        } else {
            setStageTrans(({ location, scale, rotation }) => {
                return {
                    anchor: newAnchor,
                    location,
                    scale,
                    rotation,
                };
            });
        }
    }, []);
};
