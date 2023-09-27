import {
    IUniformValue,
    UniformFloat,
    UniformInt,
    VertexDataProvider,
    OffscreenRenderer,
    FragmentShader,
    VertexShader,
    Program,
} from 'application/core/web-gl2';

type ShaderUniforms = {
    readonly [key: string]: {
        readonly type: 'float' | 'int';
        readonly value: IUniformValue;
    };
};
class RenderShaderObject {
    readonly fragment: string;
    readonly vertex: string;
    readonly uniforms: ShaderUniforms;

    constructor(
        vertexShaderSource: string,
        fragmentShaderSource: string,
        uniforms: ShaderUniforms
    ) {
        this.vertex = vertexShaderSource;
        this.fragment = fragmentShaderSource;
        this.uniforms = uniforms;
    }
}

type RendererParam = {
    shader: RenderShaderObject;
    vertex: VertexDataProvider;
};
type RenderOptions = {
    offscreen?: OffscreenRenderer | null;
    mode?: GLenum;
    type?: GLenum;
    offset?: number;
};
type RendererListenerProps = {
    render: (options?: RenderOptions) => void;
    getUniformFloat: <T extends IUniformValue>(name: string) => UniformFloat<T>;
    getUniformInt: <T extends IUniformValue>(name: string) => UniformInt<T>;
};

class ElementRenderer {
    private gl2: WebGL2RenderingContext;
    private program: Program;
    private vertex: VertexDataProvider;
    private uniforms: ShaderUniforms;

    constructor(gl2: WebGL2RenderingContext, { vertex, shader }: RendererParam) {
        this.gl2 = gl2;
        this.uniforms = shader.uniforms;
        this.vertex = vertex;
        this.program = new Program(
            this.gl2,
            new FragmentShader(this.gl2, shader.fragment),
            new VertexShader(this.gl2, shader.vertex)
        );
        this.vertex.setAttrsFrom(this.program);
    }
    public useRendering(listener: (props: RendererListenerProps) => void) {
        const render = ({ offscreen, mode, type, offset }: RenderOptions = {}) => {
            this.setUpOffscreen(offscreen ?? null);
            this.gl2.drawElements(
                mode ?? this.gl2.TRIANGLES,
                this.vertex.bufferElementCount,
                type ?? this.gl2.UNSIGNED_SHORT,
                offset ?? 0
            );
        };
        this.activateRenderer();
        listener({
            getUniformFloat: <T extends IUniformValue>(name: string) =>
                this.program.getUniformFloat<T>(name),
            getUniformInt: <T extends IUniformValue>(name: string) =>
                this.program.getUniformInt<T>(name),
            render,
        });
        this.deactivateRenderer();
    }
    private setUpOffscreen(offscreenRenderer: OffscreenRenderer | null) {
        if (offscreenRenderer === null) {
            OffscreenRenderer.removeOffscreenRenderer(this.gl2);
        } else {
            offscreenRenderer.activate();
        }
    }

    private activateRenderer() {
        this.program.use();
        this.vertex.activate();
        this.setUniformsInitialValue();
    }

    private deactivateRenderer() {
        this.vertex.deactivate();
    }
    private setUniformsInitialValue() {
        for (const [key, uInfo] of Object.entries(this.uniforms)) {
            const uniform =
                uInfo.type === 'float'
                    ? this.program.getUniformFloat(key)
                    : this.program.getUniformInt(key);

            uniform.set(uInfo.value);
        }
    }
}

export type { RendererParam, RenderOptions, ShaderUniforms, RendererListenerProps };
export { ElementRenderer, RenderShaderObject };
