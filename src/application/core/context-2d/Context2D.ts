import { AbstractContext2D, Context2DCreateOptions } from './AbstractContext2D';

export class Context2D extends AbstractContext2D<CanvasRenderingContext2D> {
    constructor(op: Context2DCreateOptions<CanvasRenderingContext2D> = {}) {
        super(op.context ?? createCanvasAndContext2D().context);
    }
    public toDataURL() {
        return this.context.canvas.toDataURL();
    }
}

function createCanvasAndContext2D(op?: CanvasRenderingContext2DSettings) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', op);

    if (context === null) {
        throw Error('Failed to get context 2D.');
    }
    return { canvas, context };
}
