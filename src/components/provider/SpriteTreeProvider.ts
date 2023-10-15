import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2, Vec4 } from 'application/core/units';
import { DataURLDecoder } from 'application/files/data-url/DataURLDecoder';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { FillSolid } from 'application/sprites/SpriteFill';
import { Rect } from 'application/sprites/shapes/Rect';
import {
    artboardTransformAtom,
    artboardResolutionAtom,
    renderViewScaleAtom,
    spriteTreeAtom,
    useSpriteTreeSaver,
} from 'dataflow';

const SpriteTreeProvider = ({ children }: { children?: React.ReactNode }) => {
    const setArtboardResolution = useSetRecoilState(artboardResolutionAtom);
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const setRenderViewSize = useSetRecoilState(renderViewScaleAtom);

    useEffect(() => {
        setArtboardResolution(new Vec2(1000, 800));
        setArtboardTrans({
            anchor: new Vec2(0.5, 0.5),
            location: new Vec2(500, 400),
            rotation: (0 / 180) * Math.PI,
            scale: new Vec2(1000, 800),
        });
        setRenderViewSize(new Vec2(1000, 800));
        (async () => {
            const imageSource = await new DataURLDecoder().decode('/sm.png');
            const imageSource2 = await new DataURLDecoder().decode('/sample.png');

            const image = new Rasterizedmage(imageSource, {
                id: uuidv4(),
                name: '山の画像',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(0, 0),
                rotation: (0 / 180) * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
            });
            const image2 = new Rasterizedmage(imageSource2, {
                id: uuidv4(),
                name: '車の画像',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(0, 0),
                rotation: (0 / 180) * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
            });
            setSpriteTree([image2, image]);
            saveSpriteTree();
        })();
    }, []);

    return children;
};

export { SpriteTreeProvider };
