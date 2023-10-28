import { useCallback } from 'react';
import { Vec2 } from 'application/core/units';
import { getArtBoardNormalizedPointFromViewPoint } from 'application/utils';
import { ArtboardTransform, artboardResolutionAtom, artboardTransformAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useViewPointToArtboardPointConverter = () => {
    const getArtboardTransSync = useRecoilValueSyncReader<ArtboardTransform>();
    const getArtobardResolutionSync = useRecoilValueSyncReader<Vec2>();

    const getViewPointToArtbpardPoint = useCallback((viewPoint: Vec2) => {
        const artboardResolution = getArtobardResolutionSync(artboardResolutionAtom);
        const { anchor, location, scale, rotation } = getArtboardTransSync(artboardTransformAtom);

        const artboardNormalizedPoint = getArtBoardNormalizedPointFromViewPoint(
            anchor,
            location,
            scale,
            rotation,
            viewPoint
        );
        return new Vec2(
            artboardNormalizedPoint.x * artboardResolution.x,
            artboardNormalizedPoint.y * artboardResolution.y
        );
    }, []);
    return getViewPointToArtbpardPoint;
};
