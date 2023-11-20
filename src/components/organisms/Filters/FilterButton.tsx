import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ISpriteWorker } from 'application/ISpriteWorker';
import { GLFilter, FilterConfigs, FilterWorker } from 'application/filters/Filter';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { SmartImage } from 'application/sprites/SmartImage';
import { searchSpriteFromID } from 'application/sprites/Sprite';
import Button from 'components/atoms/Button';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import FloatingWindow from 'components/molecules/FloatingWindow';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { filterGLAtom } from 'dataflow/gl/filterGLAtom';
import { useActiveSpritesReader } from 'hooks/sprites/useActiveSpritesReader';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

type FilterButtonProps<T extends FilterConfigs> = {
    children?: React.ReactNode;
    getWindowChildren?: (updateFilter: () => void) => React.ReactNode;
    title?: string;
    filter: GLFilter<T>;
    config: T;
};

export const FilterButton = <T extends FilterConfigs>({
    children,
    title,
    filter,
    config,
    getWindowChildren: windowChildren,
}: FilterButtonProps<T>) => {
    const getActiveSprite = useActiveSpritesReader();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const [show, setShow] = useState(false);

    const [filterWorker, setFilterWorker] = useState<FilterWorker<T> | null>(null);
    const [targetID, setTargetID] = useState('');

    const getFilterGLSync = useRecoilValueSyncReader<WebGL2RenderingContext | null>();

    const setWorkerPreviewSprite = (id: string, worker: ISpriteWorker | null) => {
        setSpriteTree((currentTree) => {
            const newTree = [...currentTree];
            const [targetSprite, index] = searchSpriteFromID(currentTree, id);
            if (
                (targetSprite instanceof Rasterizedmage || targetSprite instanceof SmartImage) &&
                index !== null &&
                worker !== null
            ) {
                newTree[index] = worker.getPreviewSprite();
            }
            return newTree;
        });
    };
    const onClick = () => {
        const gl = getFilterGLSync(filterGLAtom);
        if (!gl) {
            console.warn('WebGLRenderingContext is null');
            return;
        }
        const activeSprite = getActiveSprite()[0];
        if (activeSprite instanceof Rasterizedmage || activeSprite instanceof SmartImage) {
            const worker = filter.getWorker(gl, activeSprite);
            setShow(true);
            setTargetID(activeSprite.prefs.id);
            setFilterWorker(worker);

            worker?.execute(config);
            setWorkerPreviewSprite(activeSprite.prefs.id, worker);
        }
    };

    const onValueChange = () => {
        filterWorker?.execute(config);
        setWorkerPreviewSprite(targetID, filterWorker);
    };
    const onDecision = () => {
        saveSpriteTree();
    };
    const onCancel = () => {
        if (filterWorker) {
            setSpriteTree((currentTree) => {
                const newTree = [...currentTree];
                const [, index] = searchSpriteFromID(currentTree, targetID);

                if (index !== null && filterWorker) {
                    newTree[index] = filterWorker.getOriginalSprite();
                }
                return newTree;
            });
        }
    };

    return (
        <>
            <FloatingWindow
                title={title}
                show={show}
                onClose={() => {
                    onCancel();
                    setShow(false);
                }}
            >
                <Box
                    css={(theme) => ({
                        backgroundColor: theme.colors.white,
                        padding: '20px',
                    })}
                >
                    {windowChildren?.(onValueChange)}
                    <Container>
                        <Wrapper
                            css={{
                                marginRight: '20px',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    onDecision();
                                    setShow(false);
                                }}
                            >
                                決定
                            </Button>
                        </Wrapper>
                        <Wrapper>
                            <Button
                                onClick={() => {
                                    onCancel();
                                    setShow(false);
                                }}
                            >
                                キャンセル
                            </Button>
                        </Wrapper>
                    </Container>
                </Box>
            </FloatingWindow>
            <Wrapper onClick={onClick}>{children}</Wrapper>
        </>
    );
};
