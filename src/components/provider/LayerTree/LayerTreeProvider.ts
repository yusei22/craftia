import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { RasterizedImagePrefs, Rasterizedmage } from 'application/sprites/RasterizedImage';
import {
    stageTransformAtom,
    stageResolutionAtom,
    spriteTreeAtom,
    useSpriteTreeSaver,
} from 'dataflow';

export const LayerTreeProvider = ({ children }: { children?: React.ReactNode }) => {
    const setStageResolution = useSetRecoilState(stageResolutionAtom);
    const setStageTrans = useSetRecoilState(stageTransformAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    useEffect(() => {
        setStageResolution(new Vec2(1920, 1080));
        setStageTrans({
            anchor: new Vec2(0.5, 0.5),
            location: new Vec2(500, 400),
            rotation: (0 / 180) * Math.PI,
            scale: new Vec2(1920, 1080),
        });

        const initalPrefs: RasterizedImagePrefs = {
            id: uuidv4(),
            name: '新規レイヤー',
            anchor: new Vec2(0, 0),
            globalLocation: new Vec2(0, 0),
            rotation: (0 / 180) * Math.PI,
            visible: true,
            blendMode: 'source-over',
            opacity: 1.0,
            shadowBlur: 0,
            shadowColor: '#0000',
            shadowOffset: new Vec2(0, 0),
        };

        (async () => {
            const image = await createImageBitmap(
                new Context2D().viewport(new Vec2(1, 1)).getCanvas()
            );
            setSpriteTree([new Rasterizedmage(image, initalPrefs, null)]);
            saveSpriteTree();
        })();
    }, []);

    return children;
};
