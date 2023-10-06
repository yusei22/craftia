import { WebGL2 } from '../WebGL2';
import { IndexBufferData, VertexBuferData } from '../buffer';
import { OffscreenRenderer } from '../offscreeen';
import { Program } from '../program';
import { FragmentShader, VertexShader } from '../shader';
import { TexOptions, Texture2D } from '../textures';
import { IUniformValue } from '../uniforms';
import { VertexAttribute } from '../vertex-attribute';
import { VertexDataProvider } from '../vertices';
import { Vec2 } from 'application/core/units';

type AttributeConfig = {
    name: string;
    size: number;
    stride: number;
    offset: number;
};

type RendererShaderParam = {
    vertexShader: string;
    fragmentShader: string;
    attributes?: AttributeConfig[];
};

type RenderOptions = {
    mode?: GLenum;
    type?: GLenum;
    offset?: number;
};

class RendererShader {
    readonly vertexShaderSource: string;
    readonly fragmentShaderSource: string;
    readonly attributeConfigs: AttributeConfig[];

    constructor({ vertexShader, fragmentShader, attributes = [] }: RendererShaderParam) {
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSource = fragmentShader;
        this.attributeConfigs = attributes;
    }
    public compile(gl2: WebGL2RenderingContext): [Program, VertexAttribute[]] {
        const program = new Program(
            gl2,
            new VertexShader(gl2, this.vertexShaderSource),
            new FragmentShader(gl2, this.fragmentShaderSource)
        );
        const attributes = this.attributeConfigs.map((attr) =>
            program.getAttribute(attr.name, attr.size, attr.stride, attr.offset)
        );
        return [program, attributes];
    }
}

class RendererBufferData {
    readonly indexData: IndexBufferData;
    readonly vertexData: VertexBuferData;

    constructor(indexData: IndexBufferData, vertexData: VertexBuferData) {
        this.indexData = indexData;
        this.vertexData = vertexData;
    }
    public createVertex(gl2: WebGL2RenderingContext) {
        return new VertexDataProvider(gl2, this.indexData, this.vertexData);
    }
}

class Renderer extends WebGL2 {
    private program: Program;
    private attributes: VertexAttribute[];
    private vertex?: VertexDataProvider;

    constructor(shader: RendererShader) {
        super();
        [this.program, this.attributes] = shader.compile(this.gl2);
    }

    public setBufferData(bufferData: RendererBufferData) {
        this.vertex = bufferData.createVertex(this.gl2);
        this.vertex.setAttributes(...this.attributes);
    }
    
    public setShader(shader: RendererShader) {
        [this.program, this.attributes] = shader.compile(this.gl2);
        this.vertex?.setAttributes(...this.attributes);
    }

    public createTexture2D(op?: TexOptions) {
        return new Texture2D(this.gl2, op);
    }

    public getCanvas(): HTMLCanvasElement | OffscreenCanvas {
        return super.getCanvas();
    }

    public viewport(size: Vec2): void {
        super.viewport(size);
    }

    public getResolution(): Vec2 {
        return super.getResolution();
    }

    public createOffscreen(size: Vec2) {
        return new OffscreenRenderer(this.gl2, size);
    }

    public setOffscreen(offscreenRenderer: OffscreenRenderer | null) {
        if (offscreenRenderer === null) {
            OffscreenRenderer.removeOffscreenRenderer(this.gl2);
        } else {
            offscreenRenderer.activate();
        }
    }

    public activate() {
        this.vertex?.activate();
        this.program.use();
        return this;
    }

    public deactivate() {
        this.vertex?.deactivate();
        return this;
    }

    public setUniformInt(name: string, value: IUniformValue) {
        this.program.getUniformInt(name).set(value);
        return this;
    }

    public setUniformFloat(name: string, value: IUniformValue) {
        this.program.getUniformFloat(name).set(value);
        return this;
    }

    public setUniformSampler2D(name: string, texture: Texture2D) {
        texture.bind();
        this.program.getUniformInt(name).set(texture.unitNumber);
        return this;
    }

    public render({ mode, type, offset }: RenderOptions = {}) {
        if (!this.vertex) {
            console.log('BufferData is not set.')
            return;
        }
        this.gl2.clearColor(0, 0, 0, 0);
        this.gl2.clear(this.gl2.COLOR_BUFFER_BIT);

        this.gl2.drawElements(
            mode ?? this.gl2.TRIANGLES,
            this.vertex.bufferElementCount,
            type ?? this.gl2.UNSIGNED_SHORT,
            offset ?? 0
        );
        return this;
    }
}

export type { RendererShaderParam, RenderOptions, AttributeConfig };
export { Renderer, RendererShader, RendererBufferData };
