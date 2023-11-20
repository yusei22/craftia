import { useCallback } from 'react';
import { Pen } from 'application/pens/Pen';
import { penAtom } from 'dataflow/pens/penAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

const useGetActivePen = () => {
    const getActivePenStateSync = useRecoilValueSyncReader<Pen>();
    const getStageTransSync = useCallback(() => {
        return getActivePenStateSync(penAtom);
    }, []);
    return getStageTransSync;
};
export { useGetActivePen };
