function createCanvasAnd2DContext(settings?: CanvasRenderingContext2DSettings) {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d', settings);
  if (!context) {
    throw Error('This browser does not support HTMLCanvasElement.');
  }
  return { canvas, context };
}
function createCanvasAndWebGL2Context() {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const gl2 = canvas.getContext('webgl2');
  if (!gl2) {
    throw Error('This browser does not support WebGL2RenderingContext.');
  }
  return { canvas, gl2 };
}

export { createCanvasAnd2DContext, createCanvasAndWebGL2Context };
