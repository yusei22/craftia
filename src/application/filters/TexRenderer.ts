import { Vec2 } from 'application/core/units';
import {
    Geometry,
    Renderer,
    Shader,
    Texture,
    UniformFloat,
    UniformGroup,
    UniformInt,
} from 'application/core/web-gl2';

const vertexShaderSource = /*glsl */ `#version 300 es
    in vec2 a_position;
    in vec2 a_texCoord;

    uniform vec2 u_resolution;
    uniform float u_flipY;

    out vec2 v_texCoord;

    void main() {
        v_texCoord =  a_texCoord;

        vec2 normalizedCoord = (a_position  / u_resolution * 2.0) - 1.0;
        gl_Position = vec4(normalizedCoord * vec2(1.0, u_flipY), 0, 1);
    }`;

export class TexRenderer {
    public readonly renderer: Renderer;
    public readonly texture: Texture;

    private texUnitnumber: number;
    private texScale: Vec2;
    private geometry: Geometry;
    private shader: Shader | null;

    constructor(gl2: WebGL2RenderingContext) {
        this.renderer = new Renderer(gl2);
        this.texture = new Texture();

        this.shader = null;
        this.geometry = new Geometry();
        this.texScale = new Vec2(0, 0);

        this.texUnitnumber = 0;
    }
    public setTexVertex(loc: Vec2, size: Vec2) {
        if (size === this.texScale) return this;
        if (!this.shader) {
            console.warn('Shader is not set. Please set the shader first.');
            return this;
        }

        this.renderer.setResolution(size);
        this.renderer.frameBuffer.setViewport(new Vec2(0, 0), size);

        const x1 = loc.x;
        const x2 = loc.x + size.x;
        const y1 = loc.y;
        const y2 = loc.y + size.y;

        this.geometry.addAttribute(
            'a_position',
            [
                x1, y1, // eslint-disable-line
                x1, y2, // eslint-disable-line
                x2, y1, // eslint-disable-line
                x2, y2, // eslint-disable-line
            ],
            2
        );

        this.geometry.addAttribute(
            'a_texCoord',
            [
                0.0, 0.0, // eslint-disable-line
                0.0, 1.0, // eslint-disable-line
                1.0, 0.0, // eslint-disable-line
                1.0, 1.0, // eslint-disable-line
            ],
            2
        );

        this.geometry.addIndex([0, 1, 2, 1, 3, 2]);
        this.geometry.interleave();

        this.renderer.geometry.update(this.geometry, this.shader);
        return this;
    }
    public setTexPixels(image: ImageBitmap | HTMLCanvasElement | OffscreenCanvas) {
        this.texture.setPixcels(image, new Vec2(image.width, image.height));

        this.renderer.texture.update(this.texture);
    }
    public setTexUnitnumber(n: number) {
        this.texUnitnumber = n;
    }
    public setFragmentShader(
        fragmentShaderSource: string,
        uniforms: (UniformFloat | UniformInt)[]
    ) {
        this.shader = Shader.from(vertexShaderSource, fragmentShaderSource, uniforms);
        this.renderer.shader.compile(this.shader);
        return this;
    }
    public activate() {
        if (this.shader) this.renderer.shader.bind(this.shader);

        this.renderer.geometry.bind(this.geometry);
        this.renderer.texture.bind(this.texture, this.texUnitnumber);

        return this;
    }
    public deactivate() {
        this.renderer.geometry.unbind();
        this.renderer.texture.unbind(this.texUnitnumber);
        return this;
    }
    public draw(op: { flipY: boolean } = { flipY: false }) {
        const uniforms = new UniformGroup([
            new UniformFloat('u_resolution', this.renderer.getResolution()),
            new UniformFloat('u_flipY', op.flipY ? -1.0 : 1.0),
        ]);

        this.renderer.clear();
        this.renderer.uniforms.transfer(uniforms);
        this.renderer.geometry.drawIndex(WebGL2RenderingContext.TRIANGLES);
        return this;
    }
    public destroy() {
        this.texture.destroy();
        this.geometry.destroy();

        this.shader?.destroy();
        this.shader = null;

        return this;
    }
}
