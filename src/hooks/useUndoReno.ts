import { createStaticLayerTree } from 'application/layers/layer-tree/layer-tree-management/createStaticLayerTree';
import { LayerTree, StaticLayerTree } from 'application/types';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

type Param = {
    key: string;
    defualt: StaticLayerTree;
    storageLength: number;
    useImageBitmap: boolean;
};

type UndoReno = {
    useSaver: () => (value: StaticLayerTree) => StaticLayerTree;
    useUndo: () => () => StaticLayerTree | undefined;
    useReno: () => () => StaticLayerTree | undefined;
    useCurrentValue: () => StaticLayerTree;
};

function useLayerTreeUndoRedo({ key, defualt, storageLength, useImageBitmap }: Param): UndoReno {
    const history: {
        past: StaticLayerTree[];
        future: StaticLayerTree[];
    } = {
        past: [],
        future: [],
    };
    const current = atom({
        key: key,
        default: defualt,
    });
    function isOverCapacity(): boolean {
        if (history.past.length + history.future.length >= storageLength) {
            return true;
        } else {
            return false;
        }
    }
    function useCurrentValue() {
        return useRecoilValue(current);
    }
    function useSaver() {
        const [currentValue, setCurrent] = useRecoilState(current);
        return (value: StaticLayerTree) => {
            history.past = [...history.past, currentValue];
            history.future = [];

            setCurrent(value);

            if (isOverCapacity()) {
                history.past.shift();
            }

            return value;
        };
    }
    function useUndo() {
        const [currentValue, setCurrent] = useRecoilState(current);
        return () => {
            if (history.past.length < 0) return;

            history.future = [currentValue, ...history.future];
            const current = history.past.pop() as StaticLayerTree;
            setCurrent(current);
            return current;
        };
    }
    function useReno() {
        const [currentValue, setCurrent] = useRecoilState(current);
        return () => {
            if (history.future.length < 0) return;

            history.past = [...history.past, currentValue];
            const current = history.future.shift() as StaticLayerTree;
            setCurrent(current);
            return current;
        };
    }
    return { useSaver, useUndo, useReno, useCurrentValue };
}
export { useLayerTreeUndoRedo };
export type { UndoReno };
