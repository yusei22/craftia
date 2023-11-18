import { Texture } from '../textures/Texture';
import { GLFrameBuffer } from './GLFrameBuffer';
import { Vec2 } from 'application/core/units';

export class FrameBuffer {
    public readonly clolorTexture: Texture;

    public glFrameBuffer: GLFrameBuffer | null;
    public size: Vec2;
    private gl: WebGL2RenderingContext | null;
    public updateID: number;

    constructor() {
        this.clolorTexture = new Texture();
        this.glFrameBuffer = null;
        this.updateID = 0;
        this.size = new Vec2(0, 0);
        this.gl = null;
    }
    public setSize(size: Vec2): this {
        if (size.equal(this.size)) {
            return this;
        }
        this.size = size;
        this.updateID++;

        return this;
    }
    public update(gl: WebGL2RenderingContext): this {
        const glFbo = this.linkGL(gl);

        if (glFbo.updateID === this.updateID) {
            return this;
        }
        glFbo.updateID = this.updateID;

        if (!this.clolorTexture.size.equal(this.size)) {
            this.clolorTexture.setSize(this.size.round());
            this.clolorTexture.update(gl);
        }

        this.clolorTexture.attachFrameBuffer(glFbo, gl.COLOR_ATTACHMENT0);
        return this;
    }
    public bind(gl: WebGL2RenderingContext): this {
        const glFbo = this.linkGL(gl);
        glFbo.bind();
        return this;
    }

    protected generateGLframeBuffer(gl: WebGL2RenderingContext) {
        return (this.glFrameBuffer = new GLFrameBuffer(gl));
    }
    protected linkGL(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glFrameBuffer) {
            return this.glFrameBuffer;
        }
        this.gl = gl;
        return this.generateGLframeBuffer(this.gl);
    }
    public destroy(): this {
        this.clolorTexture.destroy();
        this.glFrameBuffer?.destroy();
        this.glFrameBuffer = null;
        return this;
    }
}
