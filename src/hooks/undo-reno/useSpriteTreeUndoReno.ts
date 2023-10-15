import { RecoilState, atom, useRecoilCallback, useRecoilValue } from 'recoil';
import { Sprite, StaticSprite } from 'application/sprites/Sprite';

type Param = {
    currentKey: string;
    defualt: StaticSprite[];
    storageLength: number;

    histPastKey: string;
    histPresentKey: string;
    histFutureKey: string;
};
type SpriteTree = Sprite<any>[];
type StaticSpriteTree = StaticSprite[];

type UndoReno = {
    /**スプライトツリーのステートを使用する */
    currentState: RecoilState<Sprite<any>[]>;

    /**スプライトツリーの内容を履歴に保存 */
    useSaver: () => () => Promise<void>;
    /**スプライトツリーを履歴から元に戻す */
    useUndo: () => () => Promise<void>;
    /**スプライトツリーを履歴からやり直す */
    useReno: () => () => Promise<void>;

    /**履歴中の過去(読み取り専用)を得る */
    useHistPastVal: () => StaticSpriteTree[];
    /**履歴中の現在(読み取り専用)を得る */
    useHistPresentVal: () => StaticSpriteTree;
    /**履歴中の未来(読み取り専用)を得る */
    useHistFutureVal: () => StaticSpriteTree[];
};

export const useSpriteTreeUndoRedo = ({
    histPastKey: pastKey,
    histPresentKey: currentKey,
    histFutureKey: futureKey,
    currentKey: realTimeKey,
    defualt,
    storageLength,
}: Param): UndoReno => {
    const current = atom<SpriteTree>({
        key: realTimeKey,
        default: defualt,
    });

    const histPast = atom<StaticSpriteTree[]>({
        key: pastKey,
        default: [],
    });

    const histPresent = atom<StaticSpriteTree>({
        key: currentKey,
        default: defualt,
    });

    const histFuture = atom<StaticSpriteTree[]>({
        key: futureKey,
        default: [],
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

    return {
        currentState: current,
        useSaver,
        useUndo,
        useReno,
        useHistPastVal,
        useHistPresentVal,
        useHistFutureVal,
    };
};
