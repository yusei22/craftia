import { ILayerImageSource } from "application/layers/layers-body";
import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import { Vec2 } from 'application/units';

class DataURLEncoder {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }
    public encode(source: ILayerImageSource) {
        if (source instanceof HTMLImageElement) {
            return source.src;
        }
        if (source instanceof HTMLCanvasElement) {
            return source.toDataURL();
        }
        const renderer = new ImageRenderer(this.context);
        const size = new Vec2(source.width, source.height);

        renderer.viewport(size);
        renderer.drawImage(source, new Vec2(0, 0), size);

        return renderer.canvas.toDataURL();
    }
}
export { DataURLEncoder };