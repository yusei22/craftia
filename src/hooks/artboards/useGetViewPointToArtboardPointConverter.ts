import { useCallback } from 'react';
import { Vec2 } from 'application/core/units';
import { getArtBoardNormalizedPointFromViewPoint } from 'application/utils';
import { useGetArtboardTransSync } from 'hooks/artboards/useGetArtboardTransSync';
import { useGetArtobardResolutionSync } from 'hooks/artboards/useGetArtobardResolutionSync';

const useGetViewPointToArtboardPointConverter = () => {
    const getArtboardTransSync = useGetArtboardTransSync();
    const getArtobardResolutionSync = useGetArtobardResolutionSync();

    const getViewPointToArtbpardPoint = useCallback((viewPoint: Vec2) => {
        const artboardResolution = getArtobardResolutionSync();
        const { anchor, location, scale, rotation } = getArtboardTransSync();

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
export { useGetViewPointToArtboardPointConverter };
