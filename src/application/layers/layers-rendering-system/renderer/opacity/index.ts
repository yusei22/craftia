export function applyOpacity(context: CanvasRenderingContext2D, opacity: number, parentOpacity: number) {
    context.globalAlpha = opacity * parentOpacity;
}