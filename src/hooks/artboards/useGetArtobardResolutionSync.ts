import { useCallback } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { Vec2 } from 'application/core/units';
import { artboardResolutionAtom } from 'dataflow';

const useGetArtobardResolutionSync = () => {
    const getArtobardResolutionStateSync = useRecoilCallback<[state: RecoilValue<Vec2>], Vec2>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getArtobardResolutionSync = useCallback(() => {
        return getArtobardResolutionStateSync(artboardResolutionAtom);
    }, []);
    return getArtobardResolutionSync;
};
export { useGetArtobardResolutionSync };
