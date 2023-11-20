import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { rotatePoint } from 'application/utils/BoardGeometry';
import { artboardTransformAtom } from 'dataflow';

export const useArtboardAnchorMover = () => {
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);

    return useCallback((newAnchor: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
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
            setArtboardTrans(({ location, scale, rotation }) => {
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
