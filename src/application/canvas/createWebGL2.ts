function createWebGL2() {
  if (typeof document === 'undefined') {
    throw Error('Failed to create canvasContext2D.This function should be called after DOM rendering');
  }
  const canvas = document.createElement('canvas');
  const gl2 = canvas.getContext('webgl2');

  if (gl2 === null) throw Error('This browser does not support WebGL2RenderingContext');

  return { canvas, gl2 };
}
export { createWebGL2 };
