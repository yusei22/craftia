import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LayerTreeRenderer } from 'application/layers/layers-rendering-system/tree-renderer/LayerTreeRenderer';
import { Vec2 } from 'application/units';
import { layerTreeState } from 'stores/LayerTree';

const Renderer = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [renderer, setRenderer] = useState<LayerTreeRenderer | null>(null);
  const layerTree = useRecoilValue(layerTreeState);
  useEffect(() => {
    const createCtx2D = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      return ctx;
    };
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const canvasContext = canvas.getContext('2d');
    setContext(canvasContext);
    setRenderer(new LayerTreeRenderer(createCtx2D(), createCtx2D(), new Vec2(1000, 1000)));
  }, []);
  useEffect(() => {
    if (renderer !== null && context !== null) {
      renderer.render(layerTree, { start: 0, end: layerTree.length });
      context.canvas.width = renderer.result.width;
      context.canvas.height = renderer.result.height;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(renderer.result, 0, 0);
    }
  }, [context, renderer, layerTree]);
  return <canvas width="1280" height="720" id="canvas"></canvas>;
};
export { Renderer };
