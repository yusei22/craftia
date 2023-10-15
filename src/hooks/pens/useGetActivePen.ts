import { useCallback } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { Pen } from 'application/pens/Pen';
import { penAtom } from 'dataflow/pens/penAtom';

const useGetActivePen = () => {
    const getActivePenStateSync = useRecoilCallback<[state: RecoilValue<Pen>], Pen>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getArtboardTransSync = useCallback(() => {
        return getActivePenStateSync(penAtom);
    }, []);
    return getArtboardTransSync;
};
export { useGetActivePen };
