import { useCallback } from 'react';
import { Vec2 } from 'application/core/units';
import { BoardGeometry } from 'application/utils/BoardGeometry';
import { StageTransform, stageResolutionAtom, stageTransformAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useViewPointToStagePointConverter = () => {
    const getStageTransSync = useRecoilValueSyncReader<StageTransform>();
    const getArtobardResolutionSync = useRecoilValueSyncReader<Vec2>();

    const getViewPointToStagePoint = useCallback((viewPoint: Vec2) => {
        const stageResolution = getArtobardResolutionSync(stageResolutionAtom);
        const { anchor, location, scale, rotation } = getStageTransSync(stageTransformAtom);

        const stageNormalizedPoint = new BoardGeometry()
            .setBoardAnchor(anchor)
            .setBoardGlobalLoc(location)
            .setBoardScale(scale)
            .setBoardRotation(rotation)
            .setPinWithGlobal(viewPoint)
            .getPinRelativeNormalized();

        return new Vec2(
            stageNormalizedPoint.x * stageResolution.x,
            stageNormalizedPoint.y * stageResolution.y
        );
    }, []);
    return getViewPointToStagePoint;
};
