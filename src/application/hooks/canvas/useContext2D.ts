import { createContext2D } from "application/canvas/createContext2D";
import { useEffect, useRef } from "react";
function useContext2D() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    useEffect(() => {
        const { canvas, context } = createContext2D();
        canvasRef.current = canvas;
        contextRef.current = context;
    }, [])
    return { canvasRef, contextRef };
}
export { useContext2D };