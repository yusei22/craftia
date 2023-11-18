import { Vec2, Vec4 } from '../units';
import { BufferManager } from './buffer';
import { FrameBufferManager } from './frameBuffer';
import { GeometryManager } from './geometry';
import { ShaderManager } from './shader';
import { TextureManager } from './textures';
import { UniformGroupManager } from './uniforms';

export class Renderer {
    public readonly gl2: WebGL2RenderingContext;
    public readonly buffer: BufferManager;
    public readonly shader: ShaderManager;
    public readonly geometry: GeometryManager;
    public readonly texture: TextureManager;
    public readonly uniforms: UniformGroupManager;
    public readonly frameBuffer: FrameBufferManager;

    constructor(gl2: WebGL2RenderingContext) {
        this.gl2 = gl2;
        this.buffer = new BufferManager(this);
        this.shader = new ShaderManager(this);
        this.geometry = new GeometryManager(this);
        this.texture = new TextureManager(this);
        this.uniforms = new UniformGroupManager(this);
        this.frameBuffer = new FrameBufferManager(this);
    }
    public setResolution(resolution: Vec2) {
        this.gl2.canvas.width = resolution.x;
        this.gl2.canvas.height = resolution.y;
    }
    public clear(color: Vec4 = new Vec4(0, 0, 0, 1)) {
        this.gl2.clearColor(color.x, color.y, color.z, color.w);
        this.gl2.clear(this.gl2.COLOR_BUFFER_BIT);
        return this;
    }
    public getCanvas() {
        return this.gl2.canvas;
    }
    public getResolution() {
        return new Vec2(this.gl2.canvas.width, this.gl2.canvas.height);
    }
}
