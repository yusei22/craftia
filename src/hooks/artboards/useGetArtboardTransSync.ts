import { useCallback } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { ArtboardTransform, artboardTransformAtom } from 'dataflow';

const useGetArtboardTransSync = () => {
    const getArtboardTransStateSync = useRecoilCallback<
        [state: RecoilValue<ArtboardTransform>],
        ArtboardTransform
    >(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getArtboardTransSync = useCallback(() => {
        return getArtboardTransStateSync(artboardTransformAtom);
    }, []);
    return getArtboardTransSync;
};
export { useGetArtboardTransSync };
