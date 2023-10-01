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
        this.context = new Context2D();
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
        const anchorRerativeLoc = new Vec2(anchor.x * scale.x, anchor.y * scale.y);
        const startPoint = location.sub(anchorRerativeLoc);
        const centerPoint = startPoint.add(scale.times(0.5));

        this.context.resetTransform();
        this.context.translate(centerPoint);
        this.context.rotate(rotate);
        this.context.translate(centerPoint.times(-1));
        this.context.drawImage(image, new Vec2(0, 0), scale);
    }
    public getResult() {
        return this.context.getCanvas();
    }
}
export { RenderView };
