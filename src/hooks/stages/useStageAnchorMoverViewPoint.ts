import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { BoardGeometry } from 'application/utils/BoardGeometry';
import { stageTransformAtom } from 'dataflow';

export const useStageAnchorMoverViewPoint = () => {
    const setStageTrans = useSetRecoilState(stageTransformAtom);

    return useCallback((newAnchorViewPoint: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setStageTrans(({ anchor, location, scale, rotation }) => {
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
            setStageTrans(({ anchor, location, scale, rotation }) => {
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
