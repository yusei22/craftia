function createContext2D() {
    if (typeof document === 'undefined') {
        throw Error('Failed to create canvasContext2D.This function should be called after DOM rendering');
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context === null) throw Error('This browser does not support CanvasRenderingContext2D');

    return { canvas, context };
}
export { createContext2D }