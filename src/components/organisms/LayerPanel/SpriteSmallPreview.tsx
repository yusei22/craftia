import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import { artboardResolutionAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

type SpriteSmallPreviewProps<T extends SpritePrefs> = {
    width: number;
    height: number;
    sprite: Sprite<T>;
};
const getZoom = (width: number, height: number, artobardResolution: Vec2) => {
    return Math.max(width / artobardResolution.x, height / artobardResolution.y);
};
export const SpriteSmallPreview = <T extends SpritePrefs>({
    width,
    height,
    sprite,
}: SpriteSmallPreviewProps<T>) => {
    const [context2D, setContext2D] = useState<Context2D | null>(null);

    const getArtobardResolution = useRecoilValueSyncReader<Vec2>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const artboardResolution = useRecoilValue(artboardResolutionAtom);

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('canvas is null');
            return;
        }
        const canvas = canvasRef.current;
        setContext2D(
            new Context2D({ context: canvas.getContext('2d') as CanvasRenderingContext2D })
        );
    }, []);

    useEffect(() => {
        if (context2D === null) {
            return;
        }
        const artboardResolution = getArtobardResolution(artboardResolutionAtom);

        const zoom = Math.max(width / artboardResolution.x, height / artboardResolution.y);

        const _sprite = sprite.setSpritePrefs((curVal) => ({
            ...curVal,
            visible: true,
            blendMode: 'source-over',
            opacity: 1.0,
        }));

        context2D.clear();
        _sprite.drawZoom(context2D, zoom);
    }, [context2D, sprite]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={artboardResolution.x * getZoom(width, height, artboardResolution)}
                height={artboardResolution.y * getZoom(width, height, artboardResolution)}
            />
        </>
    );
};
