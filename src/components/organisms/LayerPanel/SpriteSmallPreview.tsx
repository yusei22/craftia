import { useEffect, useRef, useState } from 'react';
import { Context2D } from 'application/core/context-2d';
import { Sprite, SpritePrefs } from 'application/sprites/Sprite';
import { useGetArtobardResolutionSync } from 'hooks/artboards/useGetArtobardResolutionSync';

type SpriteSmallPreviewProps<T extends SpritePrefs> = {
    width: number;
    height: number;
    sprite: Sprite<T>;
};
export const SpriteSmallPreview = <T extends SpritePrefs>({
    width,
    height,
    sprite,
}: SpriteSmallPreviewProps<T>) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const getArtobardResolution = useGetArtobardResolutionSync();

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('canvas is null');
            return;
        }
        const canvas = canvasRef.current;
        setContext(canvas.getContext('2d'));
    }, []);

    useEffect(() => {
        if (context === null) {
            return;
        }
        const artboardResolution = getArtobardResolution();

        const zoom = Math.max(width / artboardResolution.x, height / artboardResolution.y);

        context.canvas.width = artboardResolution.x * zoom;
        context.canvas.height = artboardResolution.y * zoom;

        const _sprite = sprite.setPrefs((curVal) => ({
            ...curVal,
            visible: true,
        }));
        _sprite.drawZoom(new Context2D({ canvasContext2D: context }), zoom);
    }, [context, sprite]);
    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    );
};
