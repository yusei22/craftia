import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useGetActivePen } from './useActivePenReader';
import { Vec2 } from 'application/core/units';
import { PenWorker } from 'application/pens/Pen';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { searchSpriteFromID } from 'application/sprites/Sprite';
import { RenderViewListeners, spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { useViewPointToArtboardPointConverter } from 'hooks/artboards/useViewPointToArtboardPointConverter';
import { useActiveSpritesReader } from 'hooks/sprites/useActiveSpritesReader';

const usePen = () => {
    const getActiveSprite = useActiveSpritesReader();
    const viewPointToArtboardPoint = useViewPointToArtboardPointConverter();
    const getActivePen = useGetActivePen();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();

    let penWorker: PenWorker | null = null;
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
            const artboardPoint = viewPointToArtboardPoint(new Vec2(xy));

            targetID = activeSprite.prefs.id;
            penWorker = getActivePen().getWorker(activeSprite);
            penWorker.pointerDown({
                pointerLoc: artboardPoint,
                pressure: 0.5,
            });
            console.log(penWorker);
            setPenWorkerPreviewSprite();
        }
    }, []);

    const onDrag: RenderViewListeners['onDrag'] = useCallback(({ xy, touches }) => {
        if (touches > 1) {
            return;
        }
        if (!penWorker) return;

        const artboardPoint = viewPointToArtboardPoint(new Vec2(xy));
        penWorker.pointerDrag({
            pointerLoc: artboardPoint,
            pressure: 0.5,
        });
        setPenWorkerPreviewSprite();
    }, []);
    const onDragEnd: RenderViewListeners['onDrag'] = useCallback(({ xy }) => {
        if (!penWorker) return;

        const artboardPoint = viewPointToArtboardPoint(new Vec2(xy));
        penWorker.pointerUp({
            pointerLoc: artboardPoint,
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
