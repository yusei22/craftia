import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

type RenderViewRenderProps = {
    rotate: number;
    anchor: Vec2;
    location: Vec2;
    scale: Vec2;
};
class RenderView {
    private context: Context2D;
    constructor() {
        this.context = new Context2D({ willReadFrequently: true });
        this.context.setAttr('imageSmoothingEnabled', false);
    }
    public get size() {
        return this.context.size;
    }
    public viewport(size: Vec2) {
        this.context.viewport(size);
    }
    public render(
        image: HTMLCanvasElement | ImageBitmap,
        { anchor, location, rotate, scale }: RenderViewRenderProps
    ) {
        this.context.setAttr('imageSmoothingEnabled', false);
        this.context.resetTransform();

        this.context.clear();
        this.context.setFillStyle('#e6e6e6');
        this.context.fillRect(new Vec2(0, 0), this.context.size);

        const anchorRerativeLoc = new Vec2(anchor.x * scale.x, anchor.y * scale.y);
        const startPoint = location.sub(anchorRerativeLoc);

        this.context.translate(location);
        this.context.rotate(rotate);
        this.context.translate(location.times(-1));
        this.context.drawImage(image, startPoint, scale);
    }
    public getCanvas() {
        return this.context.getCanvas();
    }
    public getImageData() {
        return this.context.getImageData(new Vec2(0, 0), this.size);
    }
}
export { RenderView };
