import { RecoilValue, useRecoilCallback } from 'recoil';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';

const useGetActiveSpriteIdsSync = () => {
    const getActiveSpriteIdStateSync = useRecoilCallback<[state: RecoilValue<string[]>], string[]>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getActiveSpriteIdsSync = () => {
        return getActiveSpriteIdStateSync(activeSpriteIdsAtom);
    };
    return getActiveSpriteIdsSync;
};
export { useGetActiveSpriteIdsSync };
