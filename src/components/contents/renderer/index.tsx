import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Vec2 } from 'application/core/units';
import { RenderView } from 'application/render/RenderView';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import {
    ArtboardRotateState,
    ArtboardLocationState,
    ArtboardScaleState,
    SpriteTreeState,
    ArtboardResolutionState,
} from 'stores';
import { RenderViewSizeState } from 'stores/RenderViewSizeState';

const ArtboardRenderView = () => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [renderView, setRenderView] = useState<RenderView | null>(null);

    const [artboardRenderer, setArtboardRenderer] = useState<SpritesRenderer | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const artboardRotate = useRecoilValue(ArtboardRotateState);
    const artboardScale = useRecoilValue(ArtboardScaleState);
    const artboardLocation = useRecoilValue(ArtboardLocationState);
    const artboardResolution = useRecoilValue(ArtboardResolutionState);

    const renderViewSize = useRecoilValue(RenderViewSizeState);
    const sprites = useRecoilValue(SpriteTreeState);

    useEffect(() => {
        if (!canvasRef.current) {
            throw new Error('canvas is null');
        }
        const canvas = canvasRef.current;
        setContext(canvas.getContext('2d'));
        setArtboardRenderer(new SpritesRenderer());
        setRenderView(new RenderView());
    }, []);

    useEffect(() => {
        if (context === null) {
            throw new Error('context is null');
        }
        if (artboardRenderer === null) {
            throw new Error('renderer is null');
        }
        if (renderView === null) {
            throw new Error('renderView is null');
        }

        artboardRenderer.viewport(new Vec2(artboardResolution));
        artboardRenderer.render(sprites);

        renderView.viewport(new Vec2(renderViewSize));
        renderView.render(artboardRenderer.getResult(), {
            anchor: new Vec2(0.5, 0.5),
            location: new Vec2(artboardLocation),
            rotate: artboardRotate,
            scale: new Vec2(artboardScale),
        });

        context.canvas.width = renderView.size.x;
        context.canvas.height = renderView.size.y;

        context.drawImage(renderView.getResult(), 0, 0);
    }, [
        artboardRotate,
        artboardScale,
        artboardLocation,
        artboardResolution,
        sprites,
        renderViewSize,
    ]);

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    );
};

export { ArtboardRenderView };
