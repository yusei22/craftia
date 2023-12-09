import { FrameBuffer, GLFrameBuffer } from '../frameBuffer';
import { GLTexture, TexPixcels, TexPixcelsOptions } from './GLTexture';
import { Vec2 } from 'application/core/units';

export class Texture {
    public updateID: number;
    public pixcels: TexPixcels;
    public size: Vec2;

    private options: TexPixcelsOptions;

    public get unitnumber() {
        return this.glTexture?.unitNumber ?? null;
    }

    private glTexture: GLTexture | null;
    private gl: WebGL2RenderingContext | null;

    constructor() {
        this.updateID = 0;
        this.pixcels = null;
        this.size = new Vec2(0, 0);
        this.glTexture = null;

        this.gl = null;

        this.options = {};
    }
    public setPixcels(pixcels: TexPixcels, size: Vec2, options?: TexPixcelsOptions): this {
        this.options = options || {};
        if (pixcels === null && this.pixcels === null) {
            this.setSize(size);
            return this;
        }

        this.pixcels = pixcels;
        this.size = size;
        this.updateID++;
        return this;
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
        const glTexture = this.linkGL(gl);

        if (glTexture.updateID === this.updateID) {
            return this;
        }

        glTexture.updateID = this.updateID;
        glTexture.attachImage(this.pixcels, this.size, this.options);
        return this;
    }

    public attachFrameBuffer(frameBuffer: GLFrameBuffer, attachmentPoint?: number): this {
        if (!this.glTexture) {
            console.error('Please update the texture first');
            return this;
        }
        frameBuffer.bind();
        this.glTexture.attachToframebuffer(attachmentPoint);
        FrameBuffer.unbind(this.glTexture.gl);
        return this;
    }

    public bind(gl: WebGL2RenderingContext, unitNumber?: number): this {
        const glTexture = this.linkGL(gl);

        if (unitNumber) glTexture.changeUnitNumber(unitNumber);
        glTexture.bind();
        return this;
    }

    protected linkGL(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glTexture) {
            return this.glTexture;
        }
        this.gl = gl;
        return this.generateGLtexture(this.gl);
    }

    protected generateGLtexture(gl2: WebGL2RenderingContext) {
        return (this.glTexture = new GLTexture(gl2));
    }
    public destroy(): this {
        this.glTexture?.destroy();
        this.glTexture = null;
        this.pixcels = null;

        return this;
    }
}
