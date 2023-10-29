import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

type ILayerImageSource = HTMLCanvasElement | OffscreenCanvas | ImageBitmap | null;

export class ImageURLEncoder {
    private context: Context2D;
    constructor(context: Context2D) {
        this.context = context;
    }
    public encode(source: ILayerImageSource): string {
        if (source instanceof HTMLCanvasElement) {
            return source.toDataURL();
        }
        if (source === null) {
            this.context.viewport(new Vec2(1, 1));
            return this.context.toDataURL();
        } else {
            const size = new Vec2(source.width, source.height);
            return this.context.viewport(size).drawImage(source, new Vec2(0, 0), size).toDataURL();
        }
    }
}
