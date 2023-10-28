import { RecoilState, useRecoilCallback } from 'recoil';

export const useRecoilValueSyncReader = <T>() =>
    useRecoilCallback<[state: RecoilState<T>], T>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
