import { atom, useRecoilCallback, useRecoilValue } from 'recoil';
import { SpriteTree, StaticSpriteTree } from 'application/sprites';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

type Param = {
    currentKey: string;
    defualt: StaticSpriteTree;
    storageLength: number;

    histPastKey: string;
    histPresentKey: string;
    histFutureKey: string;
};

export const createSpriteTreeUndoRedo = ({
    histPastKey: pastKey,
    histPresentKey: currentKey,
    histFutureKey: futureKey,
    currentKey: realTimeKey,
    defualt,
    storageLength,
}: Param) => {
    const current = atom<SpriteTree>({
        key: realTimeKey,
        default: defualt,
        dangerouslyAllowMutability: true,
    });

    const histPast = atom<StaticSpriteTree[]>({
        key: pastKey,
        default: [],
        dangerouslyAllowMutability: true,
    });

    const histPresent = atom<StaticSpriteTree>({
        key: currentKey,
        default: defualt,
        dangerouslyAllowMutability: true,
    });

    const histFuture = atom<StaticSpriteTree[]>({
        key: futureKey,
        default: [],
        dangerouslyAllowMutability: true,
    });

    const useSaver = () =>
        useRecoilCallback(({ snapshot, set }) => async () => {
            const currentVal = await snapshot.getPromise(current);
            const histPresentVal = await snapshot.getPromise(histPresent);

            const currentStaicSprites = await Promise.all(
                currentVal.map(async (sprite) => {
                    return await sprite.createStatic();
                })
            );

            set(histPast, (pastVal) => {
                const newPast = [...pastVal, histPresentVal];

                if (newPast.length > storageLength) {
                    newPast.shift();
                }

                return newPast;
            });
            set(histPresent, currentStaicSprites);
            set(histFuture, []);

            set(current, currentStaicSprites);
        });
    const useUndo = () =>
        useRecoilCallback(({ snapshot, set }) => async () => {
            const histPresentVal = await snapshot.getPromise(histPresent);
            const histPastVal = await snapshot.getPromise(histPast);
            console.log(histPastVal);

            if (histPastVal.length <= 1) return;

            set(histFuture, (futureVal) => [histPresentVal, ...futureVal]);
            set(histPresent, histPastVal[histPastVal.length - 1]);

            set(histPast, (pastValue) => {
                const newPastVal = [...pastValue];
                newPastVal.pop();

                return newPastVal;
            });

            set(current, histPastVal[histPastVal.length - 1]);
        });
    const useReno = () =>
        useRecoilCallback(({ snapshot, set }) => async () => {
            const histPresentVal = await snapshot.getPromise(histPresent);
            const histFutureVal = await snapshot.getPromise(histFuture);

            if (histFutureVal.length <= 0) return;

            set(histPast, (pastValue) => [...pastValue, histPresentVal]);
            set(histPresent, histFutureVal[0]);

            set(histFuture, (futureValue) => {
                const newFutureValue = [...futureValue];
                newFutureValue.shift();
                return newFutureValue;
            });

            set(current, histFutureVal[0]);
        });
    const useHistPastVal = () => {
        return useRecoilValue(histPast);
    };
    const useHistPresentVal = () => {
        return useRecoilValue(histPresent);
    };
    const useHistFutureVal = () => {
        return useRecoilValue(histFuture);
    };
    const useHistPastValSyncReader = () => {
        const getHistPastValSync = useRecoilValueSyncReader<StaticSpriteTree[]>();
        return () => getHistPastValSync(histPast);
    };
    const useHistPresentValSyncReader = () => {
        const getHistPresentValSync = useRecoilValueSyncReader<StaticSpriteTree>();
        return () => getHistPresentValSync(histPresent);
    };
    const useHistFutureValSyncReader = () => {
        const getHistFutureValSync = useRecoilValueSyncReader<StaticSpriteTree[]>();
        return () => getHistFutureValSync(histFuture);
    };
    return {
        currentState: current,
        useSaver,
        useUndo,
        useReno,
        useHistPastVal,
        useHistPresentVal,
        useHistFutureVal,
        useHistPastValSyncReader,
        useHistPresentValSyncReader,
        useHistFutureValSyncReader,
    };
};
