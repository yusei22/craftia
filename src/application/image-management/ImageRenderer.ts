import { Ctx2DConsumer } from "../canvas/Ctx2DConsumer";
import { createCanvasAnd2DContext } from "../canvas/createCanvas";
import { Vec2 } from "../units";
class ImageRenderer extends Ctx2DConsumer {
    constructor() {
        super(createCanvasAnd2DContext().context)
    }
    public get canvas() {
        return super.getCanvas();
    }
    public destroy(): void {
        super.destroy();
    }
    public viewport(size: Vec2): void {
        super.viewport(size)
    }
    public drawImage(souce: CanvasImageSource, location: Vec2): void;
    public drawImage(souce: CanvasImageSource, location: Vec2, resize: Vec2): void;
    public drawImage(souce: CanvasImageSource, croppingLocation: Vec2, croppingSize: Vec2, location: Vec2, resize: Vec2): void;
    public drawImage(souce: CanvasImageSource, a: Vec2, b?: Vec2, c?: Vec2, d?: Vec2): void {
        if (b && c && d) {
            super.drawImage(souce, a, b, c, d);
            return;
        }
        else if (b) {
            super.drawImage(souce, a, b);
        }
        else {
            super.drawImage(souce, a);
        }
    }
    public clear(): void {
        super.clear();
    }
    public toDataURL() {
        return this.canvas.toDataURL();
    }
}
export { ImageRenderer }