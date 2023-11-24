import { useSetRecoilState } from 'recoil';
import { FilterConfigs, FilterWorker, GLFilter } from 'application/filters/Filter';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import Wrapper from 'components/layout/Wrapper';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';
import { useGLFilterWorkerGetter } from 'hooks/filters/useGLFilterWorkerGetter';
import { useActiveSpritesReader } from 'hooks/sprites/useActiveSpritesReader';

export type GLFilterButtonProps<T extends FilterConfigs> = {
    children?: React.ReactNode;
    filter: GLFilter<T>;
    label: string;

    WindowContents: ({
        sprite,
        worker,
        onClose,
    }: {
        sprite: Rasterizedmage | SmartImage;
        worker: FilterWorker<T>;

        onClose: () => unknown;
    }) => JSX.Element;
};

export const GLFilterButton = <T extends FilterConfigs>({
    children,
    filter,
    label,
    WindowContents,
}: GLFilterButtonProps<T>) => {
    const getGLFilterWorker = useGLFilterWorkerGetter();
    const getActiveSprite = useActiveSpritesReader();

    const setWindow = useSetRecoilState(floatingWindowAtom);

    const onClick = () => {
        const activeSprite = getActiveSprite()[0];

        if (!(activeSprite instanceof Rasterizedmage) && !(activeSprite instanceof SmartImage)) {
            return;
        }

        const worker = getGLFilterWorker(activeSprite, filter);

        if (!worker) {
            return;
        }
        setWindow({
            title: label,
            onClose: () => {},
            contents: <WindowContents sprite={activeSprite} worker={worker} onClose={onClose} />,
            show: true,
        });
    };
    const onClose = () => {
        setWindow({
            title: '',
            onClose: () => {},
            contents: <></>,
            show: false,
        });
    };

    return (
        <Wrapper
            onClick={onClick}
            css={{
                width: '100%',
            }}
        >
            {children}
        </Wrapper>
    );
};
