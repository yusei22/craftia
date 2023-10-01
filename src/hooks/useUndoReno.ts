import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type Param<T> = {
    pastKey: string;
    currentKey: string;
    futureKey: string;
    defualt: T;
    storageLength: number;
};

type UndoReno<T> = {
    useSaver: () => (valOrUpdater: T | ((currVal: T) => T)) => void;
    useUndo: () => () => void;
    useReno: () => () => void;
    usePastValue: () => T[];
    useCurrentValue: () => T;
    useFutureValue: () => T[];
};

function createUndoRedo<T>({
    pastKey,
    currentKey,
    futureKey,
    defualt,
    storageLength,
}: Param<T>): UndoReno<T> {
    const past = atom<T[]>({
        key: pastKey,
        default: [],
    });

    const current = atom<T>({
        key: currentKey,
        default: defualt,
    });

    const future = atom<T[]>({
        key: futureKey,
        default: [],
    });

    function useSaver() {
        const setPast = useSetRecoilState(past);
        const setFuture = useSetRecoilState(future);

        const [currentValue, setCurrent] = useRecoilState(current);

        return (valOrUpdater: T | ((currVal: T) => T)) => {
            setPast((pastValue) => {
                const newPast = [...pastValue, currentValue];

                if (newPast.length > storageLength) {
                    newPast.shift();
                }
                return newPast;
            });
            setCurrent(valOrUpdater);
            setFuture([]);
        };
    }
    function useUndo() {
        const [currentValue, setCurrent] = useRecoilState(current);
        const [pastValue, setPast] = useRecoilState(past);
        const setFuture = useSetRecoilState(future);

        return () => {
            if (pastValue.length <= 0) return;

            setFuture((futureValue) => [currentValue, ...futureValue]);
            setCurrent(pastValue[pastValue.length - 1]);
            setPast((pastValue) => {
                const newPastValue = [...pastValue];
                newPastValue.pop();
                return newPastValue;
            });
        };
    }
    function useReno() {
        const [currentValue, setCurrent] = useRecoilState(current);
        const setPast = useSetRecoilState(past);
        const [futureValue, setFuture] = useRecoilState(future);

        return () => {
            if (futureValue.length <= 0) return;

            setPast((pastValue) => [...pastValue, currentValue]);
            setFuture((futureValue) => {
                const newFutureValue = [...futureValue];
                newFutureValue.shift();
                return newFutureValue;
            });
            setCurrent(futureValue[0]);
        };
    }
    function useCurrentValue() {
        return useRecoilValue(current);
    }
    function usePastValue() {
        return useRecoilValue(past);
    }
    function useFutureValue() {
        return useRecoilValue(future);
    }
    return { useSaver, useUndo, useReno, usePastValue, useCurrentValue, useFutureValue };
}

export { createUndoRedo };
export type { UndoReno };
