import { AbstractContext2D, Context2DCreateOptions } from './AbstractContext2D';

export class OffscreenContext2D extends AbstractContext2D<OffscreenCanvasRenderingContext2D> {
    constructor(op: Context2DCreateOptions<OffscreenCanvasRenderingContext2D> = {}) {
        super(op.context ?? createCanvasAndContext2D(op).context);
    }
}

function createCanvasAndContext2D(op?: CanvasRenderingContext2DSettings) {
    const canvas = new OffscreenCanvas(1, 1);
    const context = canvas.getContext('2d', op);

    if (context === null) {
        throw Error('Failed to get context 2D.');
    }
    return { canvas, context };
}
