import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { BoardGeometry } from 'application/utils/BoardGeometry';
import { artboardTransformAtom } from 'dataflow';

export const useArtboardAnchorMoverViewPoint = () => {
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);

    return useCallback((newAnchorViewPoint: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const boardGeometry = new BoardGeometry()
                    .setBoardAnchor(anchor)
                    .setBoardGlobalLoc(location)
                    .setBoardScale(scale)
                    .setBoardRotation(rotation)
                    .setPinWithGlobal(newAnchorViewPoint);

                return {
                    anchor: boardGeometry.getPinRelativeNormalized(),
                    location: newAnchorViewPoint,
                    scale,
                    rotation,
                };
            });
        } else {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const boardGeometry = new BoardGeometry()
                    .setBoardAnchor(anchor)
                    .setBoardGlobalLoc(location)
                    .setBoardScale(scale)
                    .setBoardRotation(rotation)
                    .setPinWithGlobal(newAnchorViewPoint);

                return {
                    anchor: boardGeometry.getPinRelativeNormalized(),
                    location: location,
                    scale: scale,
                    rotation: rotation,
                };
            });
        }
    }, []);
};
