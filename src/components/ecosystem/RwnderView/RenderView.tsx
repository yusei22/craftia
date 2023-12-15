import { useEffect, useState, useRef } from 'react';
import { useRenderView } from 'hooks/renderViews/useRenderView';

const RenderView = () => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useRenderView(context);

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('canvas is null');
            return;
        }
        const canvas = canvasRef.current;
        setContext(canvas.getContext('2d', { willReadFrequently: true }));
    }, []);
    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    );
};
export { RenderView };
