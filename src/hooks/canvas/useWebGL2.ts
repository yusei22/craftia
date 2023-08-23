import { useEffect, useRef } from "react";
function useWebGL2() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gl2Ref = useRef<WebGL2RenderingContext | null>(null);
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2');
        canvasRef.current = canvas;
        gl2Ref.current = context;
    },[])
    return { canvasRef, gl2Ref };
}
export { useWebGL2 };