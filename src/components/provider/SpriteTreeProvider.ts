import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2, Vec4 } from 'application/core/units';
import { ImageURLDecoder } from 'application/files/ImageURLDecoder';
import { Arc } from 'application/sprites';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { FillSolid } from 'application/sprites/SpriteFill';
import { Rect } from 'application/sprites/shapes/Rect';
import {
    stageTransformAtom,
    stageResolutionAtom,
    spriteTreeAtom,
    useSpriteTreeSaver,
} from 'dataflow';

const SpriteTreeProvider = ({ children }: { children?: React.ReactNode }) => {
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
        (async () => {
            const decoder = new ImageURLDecoder();
            const imageSource2 = await decoder.decode('/car.png');
            const rect = new Rect(
                {
                    id: uuidv4(),
                    name: '角丸矩形',
                    anchor: new Vec2(0, 0),
                    globalLocation: new Vec2(800, 300),
                    rotation: (0 / 180) * Math.PI,
                    visible: true,
                    blendMode: 'source-over',
                    opacity: 1.0,
                    shadowBlur: 0,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowOffset: new Vec2(0, 0),
                    fillStyle: new FillSolid({ color: new Vec4(255, 0, 0, 0.8) }),
                    strokeCap: 'round',
                    strokeDashOffset: 0,
                    strokeJoin: 'bevel',
                    strokeWidth: 10,
                    strokeStyle: new FillSolid({ color: new Vec4(0, 0, 0, 1) }),
                    scale: new Vec2(300, 300),
                    round: [10, 20, 0, 30],
                },
                null
            );
            const arc = new Arc(
                {
                    id: uuidv4(),
                    name: '丸',
                    anchor: new Vec2(0, 0),
                    globalLocation: new Vec2(200, 300),
                    rotation: (30 / 180) * Math.PI,
                    visible: true,
                    blendMode: 'source-over',
                    opacity: 1.0,
                    shadowBlur: 0,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowOffset: new Vec2(0, 0),
                    fillStyle: new FillSolid({ color: new Vec4(255, 0, 0, 0.8) }),
                    strokeCap: 'round',
                    strokeDashOffset: 0,
                    strokeJoin: 'bevel',
                    strokeWidth: 10,
                    strokeStyle: new FillSolid({ color: new Vec4(0, 0, 0, 1) }),
                    scale: new Vec2(300, 300),
                    round: [10, 20, 0, 30],
                    startAngle: 0,
                    endAngle: (360 / 180) * Math.PI,
                },
                null
            );

            /**
            const image = new SmartImage(imageSource, {// eslint-disable-line
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
                    scale: new Vec2(1000, 700),
                },
                null
            );
             */

            const image2 = new Rasterizedmage(imageSource2, {// eslint-disable-line
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
                },
                null
            );

            setSpriteTree([rect, arc, image2]);
            saveSpriteTree();
        })();
    }, []);

    return children;
};

export { SpriteTreeProvider };
