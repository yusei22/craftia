import useRenderViewRender from "hooks/renderView/useArtboardRender"
import { useEffect, useState, useRef } from 'react';

const RenderView = () => {

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { source: renderViewSource, deps: renderViewDeps } = useRenderViewRender();
    useEffect(() => {
        if (!canvasRef.current) {
            console.error('canvas is null')
            return;
        }
        const canvas = canvasRef.current;
        setContext(canvas.getContext('2d'));
    }, []);
    useEffect(() => {
        if (context === null) {
            return;
        }
        if (renderViewSource === null) {
            return;
        }

        context.imageSmoothingEnabled = false;
        context.canvas.width = renderViewSource.width;
        context.canvas.height = renderViewSource.height;

        context.drawImage(renderViewSource, 0, 0);

    }, [context, renderViewDeps]);

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}
export { RenderView };