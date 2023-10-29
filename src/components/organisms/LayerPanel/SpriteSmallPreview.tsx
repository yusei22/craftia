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
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const getArtobardResolution = useRecoilValueSyncReader<Vec2>();
    const artobardResolution = useRecoilValue(artboardResolutionAtom);

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
        const artboardResolution = getArtobardResolution(artboardResolutionAtom);

        const zoom = Math.max(width / artboardResolution.x, height / artboardResolution.y);

        context.canvas.width = artboardResolution.x * zoom;
        context.canvas.height = artboardResolution.y * zoom;

        const _sprite = sprite.setSpritePrefs((curVal) => ({
            ...curVal,
            visible: true,
        }));
        _sprite.drawZoom(new Context2D({ context }), zoom);
    }, [context, sprite]);
    return (
        <>
            <canvas
                ref={canvasRef}
                width={artobardResolution.x * getZoom(width, height, artobardResolution)}
                height={artobardResolution.y * getZoom(width, height, artobardResolution)}
            />
        </>
    );
};
