import { OffscreenRenderer } from '../offscreeen';
import { Texture2D } from '../textures';
import { IUniformValue, UniformFloat, UniformInt } from '../uniforms';
import { Tex2DVertex } from '../vertices';
import { ElementRenderer, RenderShaderObject, ShaderUniforms } from './ElementRenderer';
import { Vec2 } from 'application/core/units';

type TexRenderShader = {
    readonly fragmentSource: string;
    readonly fragmentUniforms: ShaderUniforms;
};

const vertexShader = /*glsl */ `#version 300 es
    in vec2 a_position;
    in vec2 a_texCoord;

    uniform float u_flipY;
    out vec2 v_texCoord;

    void main() {
        v_texCoord = a_texCoord;
        gl_Position = vec4( a_position * vec2(1.0, u_flipY), 0, 1);
    }`;

type TexRenderOptions = {
    offscreen?: OffscreenRenderer | null;
    flipY: boolean;
};

type TexRenderProps = {
    render: (texture: Texture2D, op: TexRenderOptions) => void;
    getUniformFloat: <T extends IUniformValue>(name: string) => UniformFloat<T>;
    getUniformInt: <T extends IUniformValue>(name: string) => UniformInt<T>;
};

class TextureRenderer extends ElementRenderer {
    constructor(gl2: WebGL2RenderingContext, texSize: Vec2, texLoc: Vec2, shader: TexRenderShader) {
        const resolution = new Vec2(gl2.canvas.width, gl2.canvas.height);

        super(gl2, {
            vertex: new Tex2DVertex(gl2, texLoc, texSize, resolution),
            shader: new RenderShaderObject(
                vertexShader,
                shader.fragmentSource,
                Object.assign(
                    {
                        u_flipY: {
                            type: 'float',
                            value: 1.0,
                        },
                        u_texture: {
                            type: 'int',
                            value: 0,
                        },
                    },
                    shader.fragmentUniforms
                )
            ),
        });
    }
    public useTexRendering(listener: (props: TexRenderProps) => void): void {
        this.useRendering(({ getUniformFloat, getUniformInt, render }) => {
            listener({
                getUniformFloat,
                getUniformInt,
                render: (texture: Texture2D, { offscreen, flipY }: TexRenderOptions) => {
                    texture.bind(0);

                    getUniformFloat('u_flipY').set(flipY ? -1.0 : 1.0);
                    render({ offscreen: offscreen });
                },
            });
        });
    }
}
export type { TexRenderShader };
export { TextureRenderer };
