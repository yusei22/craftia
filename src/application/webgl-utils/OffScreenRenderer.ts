import { FrameBuffer } from "./webgl/FrameBuffer";
import { Texture2D } from "./webgl/Texture2D";
import { Vec2 } from "../units";
export class OffScreenRenderer {
    readonly gl: WebGL2RenderingContext;
    private frameBuffer: FrameBuffer;
    readonly resultTexture: Texture2D;
    readonly size: Vec2;
    constructor(
        gl: WebGL2RenderingContext,
        size: Vec2
    ) {
        this.gl = gl;
        this.size = size.clone();
        this.frameBuffer = new FrameBuffer(this.gl);
        this.resultTexture = new Texture2D(this.gl);
        this.resultTexture.attachImage(null, this.size);
        this.activate();
        this.resultTexture.attachToframebuffer();
        this.deactivate();
    }
    activate() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.frameBuffer.bind();
    }
    /**デフォルトのフレームブァッファを使う */
    deactivate() {
        this.frameBuffer.unbind();
    }
    static toOnscreen(gl: WebGL2RenderingContext) {
        FrameBuffer.bindDefaultFrameBuffer(gl);
    }
}