import { Texture } from '../textures/Texture';
import { GLFrameBuffer } from './GLFrameBuffer';
import { Vec2 } from 'application/core/units';

export class FrameBuffer {
    public readonly clolorTexture: Texture;

    private glFrameBuffer: GLFrameBuffer | null;
    private _size: Vec2;
    private gl: WebGL2RenderingContext | null;
    private updateID: number;

    constructor() {
        this.clolorTexture = new Texture();
        this.glFrameBuffer = null;
        this.updateID = 0;
        this._size = new Vec2(0, 0);
        this.gl = null;
    }
    public get size() {
        return this._size;
    }
    public setSize(size: Vec2): this {
        if (size.equal(this._size)) {
            return this;
        }
        this._size = size;
        this.updateID++;

        return this;
    }
    public update(gl: WebGL2RenderingContext): this {
        const glFbo = this.generateGLframeBuffer(gl);

        if (glFbo.updateID === this.updateID) {
            return this;
        }
        glFbo.updateID = this.updateID;

        if (!this.clolorTexture.size.equal(this._size)) {
            this.clolorTexture.setSize(this._size.round());
            this.clolorTexture.update(gl);
        }

        this.clolorTexture.attachFrameBuffer(glFbo, gl.COLOR_ATTACHMENT0);
        return this;
    }
    public bind(gl: WebGL2RenderingContext): this {
        const glFbo = this.generateGLframeBuffer(gl);
        glFbo.bind();
        return this;
    }
    static unbind(gl: WebGL2RenderingContext) {
        GLFrameBuffer.unbind(gl);
    }

    protected generateGLframeBuffer(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glFrameBuffer) {
            return this.glFrameBuffer;
        }
        this.gl = gl;
        return (this.glFrameBuffer = new GLFrameBuffer(gl));
    }
    public destroy(): this {
        this.clolorTexture.destroy();
        this.glFrameBuffer?.destroy();
        this.glFrameBuffer = null;
        return this;
    }
}
