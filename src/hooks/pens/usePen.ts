import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useGetActivePen } from './useActivePenReader';
import { Vec2, Vec4 } from 'application/core/units';
import { PenExecutor } from 'application/pens/Pen';
import { FillSolid } from 'application/sprites';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { searchSpriteFromID } from 'application/sprites/Sprite';
import { RenderViewListeners, spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { RGB, RGBColorAtom } from 'dataflow/colors/RGBColorAtom';
import { useActiveSpritesReader } from 'hooks/sprites/useActiveSpritesReader';
import { useViewPointToStagePointConverter } from 'hooks/stages/useViewPointToStagePointConverter';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

const usePen = () => {
    const getActiveSprite = useActiveSpritesReader();
    const viewPointToStagePoint = useViewPointToStagePointConverter();
    const getActivePen = useGetActivePen();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const getRGBColor = useRecoilValueSyncReader<RGB>();

    let penWorker: PenExecutor | null = null;
    let targetID: string = '';

    const setPenWorkerPreviewSprite = () => {
        setSpriteTree((currentTree) => {
            const newTree = [...currentTree];
            const [targetSprite, index] = searchSpriteFromID(currentTree, targetID);

            if (targetSprite instanceof Rasterizedmage && penWorker && index !== null) {
                newTree[index] = penWorker.getPreviewSprite();
            }
            return newTree;
        });
    };

    const onDragStart: RenderViewListeners['onDrag'] = useCallback(({ xy, touches }) => {
        if (touches > 1) {
            return;
        }

        const activeSprite = getActiveSprite()[0];
        if (!activeSprite) return;

        if (activeSprite instanceof Rasterizedmage) {
            const stagePoint = viewPointToStagePoint(new Vec2(xy));
            const color = getRGBColor(RGBColorAtom);

            targetID = activeSprite.prefs.id;
            penWorker = getActivePen()
                .setPrefs((curPrefs) => ({
                    ...curPrefs,
                    fillStyle:
                        curPrefs.fillStyle instanceof FillSolid
                            ? new FillSolid({
                                  color: new Vec4(
                                      color.r,
                                      color.g,
                                      color.b,
                                      curPrefs.fillStyle instanceof FillSolid
                                          ? curPrefs.fillStyle.color.a
                                          : 1.0
                                  ),
                              })
                            : curPrefs.fillStyle,
                }))
                .getWorker(activeSprite);
            penWorker.pointerDown({
                pointerLoc: stagePoint,
                pressure: 0.5,
            });

            setPenWorkerPreviewSprite();
        }
    }, []);

    const onDrag: RenderViewListeners['onDrag'] = useCallback(({ xy, touches }) => {
        if (touches > 1) {
            return;
        }
        if (!penWorker) return;

        const stagePoint = viewPointToStagePoint(new Vec2(xy));

        penWorker.pointerDrag({
            pointerLoc: stagePoint,
            pressure: 0.5,
        });

        setPenWorkerPreviewSprite();
    }, []);

    const onDragEnd: RenderViewListeners['onDrag'] = useCallback(({ xy }) => {
        if (!penWorker) return;

        const stagePoint = viewPointToStagePoint(new Vec2(xy));

        penWorker.pointerUp({
            pointerLoc: stagePoint,
            pressure: 0.5,
        });

        setPenWorkerPreviewSprite();
        saveSpriteTree();

        penWorker = null;
        targetID = '';
    }, []);
    return { onDrag, onDragStart, onDragEnd };
};
export { usePen };
