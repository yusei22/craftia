import { useCallback } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { artbordZoomSelector } from 'dataflow';

export const useGetArtboardZoomSync = () => {
    const getArtobardResolutionStateSync = useRecoilCallback<[state: RecoilValue<number>], number>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getArtbordZoomSync = useCallback(() => {
        return getArtobardResolutionStateSync(artbordZoomSelector);
    }, []);
    return getArtbordZoomSync;
};
