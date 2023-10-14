import { Context2D } from 'application/core/context-2d';
import { Vec2, Vec4 } from 'application/core/units';

type RenderViewRenderProps = {
    rotation: number;
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
        { anchor, location, rotation: rotate, scale }: RenderViewRenderProps
    ) {
        this.context.setAttr('imageSmoothingEnabled', false);
        this.context.resetTransform();

        this.context.clear();
        this.context.setFillStyle('#ffffff');
        this.context.fillRect(new Vec2(0, 0), this.context.size);

        this.context.setShadowConfig({
            shadowOffset: new Vec2(0, 0),
            shadowBlur: 30,
            shadowColor: 'rgba(0,0,0,0.2)',
        });

        const anchorRerativeLoc = new Vec2(anchor.x * scale.x, anchor.y * scale.y);
        const startPoint = location.sub(anchorRerativeLoc);

        this.context.translate(location);
        this.context.rotate(rotate);
        this.context.translate(location.times(-1));
        this.context.fillRect(startPoint, scale);
        this.context.setShadowConfig(null);
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
