import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { FilterConfigs, FilterExecutor, GLFilter } from 'application/filters/Filter';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import Box from 'components/layout/Box';
import Wrapper from 'components/layout/Wrapper';
import { useSpriteTreeSaver } from 'dataflow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';
import { useGLFilterExecutorGetter } from 'hooks/filters/useGLFilterExecutorGetter';
import { useActiveSpritesReader } from 'hooks/sprites/useActiveSpritesReader';
import { useCallbackOnSprites } from 'hooks/sprites/useCallbackOnSprites';

export type GLFilterControlPanelsProps<T extends FilterConfigs> = {
    onConsent: () => unknown;
    onCancel: () => unknown;
    configs: T;
    setConfigs: Dispatch<SetStateAction<T>>;
    targetSprite: Rasterizedmage | SmartImage;
};

export const GLFilterWindow = <T extends FilterConfigs>({
    sprite,
    executor,
    executorInitalConfigs,
    ControlPanels,
}: {
    sprite: Rasterizedmage | SmartImage;
    executor: FilterExecutor<T>;
    executorInitalConfigs: T;
    ControlPanels: (props: GLFilterControlPanelsProps<T>) => JSX.Element;
}) => {
    const setWindow = useSetRecoilState(floatingWindowAtom);
    const setSpriteId = useCallbackOnSprites();
    const saveSpriteTree = useSpriteTreeSaver();
    const [configs, setConfigs] = useState<T>(executorInitalConfigs);

    const onConsent = () => {
        saveSpriteTree();
        setWindow({
            title: '',
            contents: <></>,
            show: false,
        });
    };

    const onCancel = () => {
        setSpriteId([sprite.prefs.id], (sprite) => executor.getOriginalSprite() || sprite);
        setWindow({
            title: '',
            contents: <></>,
            show: false,
        });
    };

    useEffect(() => {
        setWindow((culVal) => ({
            ...culVal,
            onClose: onCancel,
        }));
        executor.execute(configs);
        setSpriteId([sprite.prefs.id], (sprite) => executor.getPreviewSprite() || sprite);
    }, [configs]);

    return (
        <ControlPanels
            onCancel={onCancel}
            onConsent={onConsent}
            configs={configs}
            setConfigs={setConfigs}
            targetSprite={sprite}
        />
    );
};

export type GLFilterButtonProps<T extends FilterConfigs> = {
    children?: React.ReactNode;
    filter: GLFilter<T>;
    filterLabel: string;
    filterInitalConfigs: T;
    ControlPanels: (props: GLFilterControlPanelsProps<T>) => JSX.Element;
};

export const GLFilterButton = <T extends FilterConfigs>({
    children,
    filter,
    filterLabel,
    filterInitalConfigs,
    ControlPanels,
}: GLFilterButtonProps<T>) => {
    const getGLFilterExecutor = useGLFilterExecutorGetter();
    const getActiveSprite = useActiveSpritesReader();

    const setWindow = useSetRecoilState(floatingWindowAtom);

    const onClick = () => {
        const activeSprite = getActiveSprite()[0];

        if (!(activeSprite instanceof Rasterizedmage) && !(activeSprite instanceof SmartImage)) {
            return;
        }

        const executor = getGLFilterExecutor(activeSprite, filter);

        if (!executor) {
            return;
        }

        setWindow({
            title: filterLabel,
            contents: (
                <Box
                    css={{
                        padding: 10,
                    }}
                >
                    <GLFilterWindow
                        sprite={activeSprite}
                        executor={executor}
                        executorInitalConfigs={filterInitalConfigs}
                        ControlPanels={ControlPanels}
                    />
                </Box>
            ),
            show: true,
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
