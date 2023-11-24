import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import { stageResolutionAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

type LayerPreviewProps<T extends SpritePrefs> = {
    width?: number;
    height?: number;
    sprite: Sprite<T>;
};
const getZoom = (width: number | undefined, height: number | undefined, stageResolution: Vec2) => {
    return Math.max((width || 0) / stageResolution.x, (height || 0) / stageResolution.y);
};
export const LayerPreview = <T extends SpritePrefs>({
    width,
    height,
    sprite,
}: LayerPreviewProps<T>) => {
    const [context2D, setContext2D] = useState<Context2D | null>(null);
    const [auxContext2D, setAuxContext2D] = useState<Context2D | null>(null);

    const getArtobardResolution = useRecoilValueSyncReader<Vec2>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stageResolution = useRecoilValue(stageResolutionAtom);

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('canvas is null');
            return;
        }
        const canvas = canvasRef.current;
        setContext2D(
            new Context2D({ context: canvas.getContext('2d') as CanvasRenderingContext2D })
        );
        setAuxContext2D(new Context2D().viewport(new Vec2(0, 0)));
    }, []);

    useEffect(() => {
        if (context2D === null || auxContext2D === null) {
            return;
        }
        const stageResolution = getArtobardResolution(stageResolutionAtom);

        const _sprite = sprite.setSpritePrefs((curVal) => ({
            ...curVal,
            visible: true,
            blendMode: 'source-over',
            opacity: 1.0,
        }));

        context2D.clear();
        _sprite.drawZoom(context2D, auxContext2D, getZoom(width, height, stageResolution));
    }, [context2D, auxContext2D, sprite]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={Math.round(stageResolution.x * getZoom(width, height, stageResolution))}
                height={Math.round(stageResolution.y * getZoom(width, height, stageResolution))}
            />
        </>
    );
};
