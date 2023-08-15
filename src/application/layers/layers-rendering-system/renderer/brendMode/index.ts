export function applyBlendMode(context: CanvasRenderingContext2D, blendMode: GlobalCompositeOperation) {
    context.globalCompositeOperation = blendMode;
}