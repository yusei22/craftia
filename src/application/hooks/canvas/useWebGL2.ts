import { useEffect, useRef } from 'react';
import { createWebGL2 } from 'application/canvas/createWebGL2';
function useWebGL2() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gl2Ref = useRef<WebGL2RenderingContext | null>(null);
  useEffect(() => {
    const { canvas, gl2 } = createWebGL2();
    canvasRef.current = canvas;
    gl2Ref.current = gl2;
  }, []);
  return { canvasRef, gl2Ref };
}
export { useWebGL2 };
