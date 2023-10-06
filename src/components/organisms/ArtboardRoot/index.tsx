import { Vec2, Vec4 } from "application/core/units";
import { DataURLDecoder } from "application/files/data-url/DataURLDecoder";
import { Rasterizedmage } from "application/sprites/RasterizedImage";
import { SmartImage } from "application/sprites/SmartImage";
import { FillSolid } from "application/sprites/SpriteFill";
import { Rect } from "application/sprites/shapes/Rect";
import { useSetArtboardPrefs } from "hooks/artboard/useSetArtboardPrefs"
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { RenderViewScaleAtom, SpriteTreeAtom } from "stores";
import { v4 as uuidv4 } from 'uuid';

const ArtboardRoot = ({ children }: { children?: React.ReactNode }) => {

    const {
        setArtboardLocation,
        setArtboardResolution,
        setArtboardRotate,
        setArtboardScale
    } = useSetArtboardPrefs();

    const setSpriteTree = useSetRecoilState(SpriteTreeAtom);
    const setRenderViewSize = useSetRecoilState(RenderViewScaleAtom)



    useEffect(() => {
        setArtboardLocation([0, 0]);
        setArtboardResolution([1000, 800]);
        setArtboardRotate(0);
        setArtboardScale([1000, 800]);

        setRenderViewSize([1000, 800]);
        (async () => {
            const imageSource = await new DataURLDecoder().decode('/m.png');
            const imageSource2 = await new DataURLDecoder().decode('/sample.png');
            const rect = new Rect({
                id: uuidv4(),
                name: 'rect',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(200, 300),
                rotation: 0 / 180 * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
                fillStyle: new FillSolid({ color: new Vec4(255, 0, 0, 0.8) }),
                strokeCap: 'round',
                strokeDashOffset: 0,
                strokeJoin: 'bevel',
                strokeWidth: 10,
                strokeStyle: new FillSolid({ color: new Vec4(0, 0, 0, 1) }),
                scale: new Vec2(300, 300),
                round: 20,
            })
            const image = new SmartImage(imageSource, {
                id: uuidv4(),
                name: 'image',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(0, 0),
                rotation: 45 / 180 * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
                scale: new Vec2(500, 500)
            })
            const image2 = new Rasterizedmage(imageSource2, {
                id: uuidv4(),
                name: 'image',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(0, 0),
                rotation: 180 / 180 * Math.PI,
                visible: true,
                blendMode: 'lighten',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
            })
            setSpriteTree([rect, image, image2]);
        })()
    }, [])

    return children;
}

export { ArtboardRoot };