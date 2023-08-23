import { useEffect, useRef } from "react";
function useContext2D() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvasRef.current = canvas;
        contextRef.current = context;
    },[])
    return { canvasRef, contextRef };
}
export { useContext2D };