import { Renderer } from '../Renderer';
import { FrameBuffer } from './FrameBuffer';
import { Vec2 } from 'application/core/units';

export class FrameBufferManager {
    private renderer: Renderer;
    private gl2: WebGL2RenderingContext;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.gl2 = this.renderer.gl2;
    }
    public update(frameBuffer: FrameBuffer) {
        frameBuffer.update(this.renderer.gl2);
        this.setViewport(new Vec2(0, 0), frameBuffer.size);
    }
    public bind(frameBuffer: FrameBuffer) {
        frameBuffer.bind(this.renderer.gl2);
    }
    public unbind() {
        FrameBuffer.unbind(this.renderer.gl2)
    }
    public setViewport(pos: Vec2, size: Vec2): void {
        this.gl2.viewport(
            Math.round(pos.x),
            Math.round(pos.y),
            Math.round(size.x),
            Math.round(size.y)
        );
    }
}
