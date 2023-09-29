import { Program } from "../program";
import { FragmentShader, VertexShader } from "../shader";
import { VertexAttribute } from "../vertex-attribute";
import { Vec2 } from 'application/core/units';
import { WebGL2 } from '../WebGL2';
import { IndexBufferData, VertexBuferData } from '../buffer';
import { OffscreenRenderer } from '../offscreeen';
import { TexOptions, Texture2D } from '../textures';
import { IUniformValue } from '../uniforms';
import { VertexDataProvider } from '../vertices';

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
    public compile(gl2: WebGL2RenderingContext) {
        const program = new Program(
            gl2,
            new VertexShader(gl2, this.vertexShaderSource),
            new FragmentShader(gl2, this.fragmentShaderSource)
        )
        const attributes = this.attributeConfigs.map((attr) =>
            program.getAttribute(attr.name, attr.size, attr.stride, attr.offset)
        )
        return new RenderCompiledShader(program, attributes);
    }
}

class RenderCompiledShader {
    readonly program: Program;
    readonly attributes: VertexAttribute[];
    constructor(program: Program, attributes: VertexAttribute[]) {
        this.program = program;
        this.attributes = attributes;
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
        return new VertexDataProvider(
            gl2,
            this.indexData,
            this.vertexData
        );
    }
}

class Renderer extends WebGL2 {
    private shader: RenderCompiledShader;
    private vertex: VertexDataProvider;

    constructor(shader: RendererShader, bufferData: RendererBufferData) {
        super();
        this.shader = shader.compile(this.gl2);

        this.vertex = bufferData.createVertex(this.gl2);
        this.vertex.setAttributes(...this.shader.attributes);
    }

    public compileShader(shader: RendererShader) {
        return shader.compile(this.gl2);
    }

    public setCompiledShader(compiledShader: RenderCompiledShader) {
        this.shader = compiledShader;
        this.vertex.setAttributes(...this.shader.attributes);
    }

    public createVertex(bufferData: RendererBufferData) {
        return bufferData.createVertex(this.gl2);
    }

    public setVertex(vertex: VertexDataProvider) {
        this.vertex = vertex;
        this.vertex.setAttributes(...this.shader.attributes);
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
        this.vertex.activate();
        this.shader.program.use();
        return this;
    }

    public deactivate() {
        this.vertex.deactivate();
        return this;
    }

    public setUniformInt(name: string, value: IUniformValue) {
        this.shader.program.getUniformInt(name).set(value);
        return this;
    }

    public setUniformFloat(name: string, value: IUniformValue) {
        this.shader.program.getUniformFloat(name).set(value);
        return this;
    }

    public setUniformSampler2D(name: string, texture: Texture2D) {
        texture.bind();
        this.shader.program.getUniformInt(name).set(texture.unitNumber);
        return this;
    }

    public render({ mode, type, offset }: RenderOptions = {}) {

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

export type { RendererShaderParam, RenderOptions, AttributeConfig }
export { Renderer, RendererShader, RenderCompiledShader, RendererBufferData };