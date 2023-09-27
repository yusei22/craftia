import { Vec2, Mat } from 'application/core/units';
import {
    CacheableRenderer,
    RenderShaderObject,
    RendererListenerProps,
    Tex2DVertex,
    TexPixcels,
    Texture2D,
    WebGL2,
} from 'application/core/web-gl2';

type ConvolutionListenerProps = RendererListenerProps;

class Convolution<T extends number> extends WebGL2 {
    public processTimes: number = 1;
    private renderer: CacheableRenderer;
    private texture: Texture2D;
    private texSize: Vec2;

    constructor(imageSize: Vec2, imageLoc: Vec2, mat: Mat<T, T>) {
        super();

        const kernelSize = getCorrectKernelSize(Math.min(mat.width, mat.heigth));
        const kernelWeight = getKernelWeight(mat, kernelSize);
        const fragmentShaderSource = createFragmentShader(kernelSize);
        const vertexShaderSource = createVertexShader();

        this.texture = new Texture2D(this.gl2);
        this.texSize = imageSize;
        this.renderer = new CacheableRenderer(this.gl2, {
            vertex: new Tex2DVertex(this.gl2, imageLoc, imageSize, this.size),
            shader: new RenderShaderObject(vertexShaderSource, fragmentShaderSource, {
                u_flipY: {
                    type: 'float',
                    value: 1.0,
                },
                u_kernel: {
                    type: 'float',
                    value: mat.item,
                },
                u_kernelWeight: {
                    type: 'float',
                    value: kernelWeight,
                },
                u_texture: {
                    type: 'int',
                    value: 0,
                },
            }),
        });
    }
    public setImage(image: TexPixcels) {
        this.texture.attachImage(image, this.texSize);
    }
    public render({ flipY }: { flipY: boolean }) {
        this.renderer.renderCache(({ getUniformFloat }) => {
            this.texture.bind(0);

            getUniformFloat('u_FlipY').set(flipY ? -1.0 : 1.0);
        });
        for (let i = 1; i < this.processTimes - 1; i++) {
            this.renderer.renderCache(({ getCacheTex }) => {
                getCacheTex().bind(0);
            });
        }
        this.renderer.render(({ getCacheTex }) => {
            getCacheTex().bind(0);
        });
    }
}
function getCorrectKernelSize(size: number) {
    const roundSize = Math.floor(size);
    return roundSize % 2 === 0 ? roundSize - 1 : roundSize;
}

function getKernelWeight<T extends number>(matrix: Mat<T, T>, kernelSize: number) {
    let weight: number = 0.0;
    for (let i = 0; i < kernelSize * kernelSize; i++) {
        weight += matrix.item[i];
    }
    return weight;
}
const createVertexShader = () => /*glsl */ `#version 300 es
    in vec2 a_position;
    in vec2 a_texCoord;

    uniform float u_flipY;
    out vec2 v_texCoord;

    void main() {
        v_texCoord = a_texCoord;
        gl_Position = vec4( a_position * vec2(1.0, u_flipY), 0, 1);
    }`;
const createFragmentShader = (kernelSize: number) => /*glsl */ `#version 300 es
    precision highp float;

    uniform sampler2D u_texture;
    uniform float u_kernel[${kernelSize}];
    uniform float u_kernelWeight;

    in vec2 v_texCoord;
    out vec4 outColor;

    void main(){
        vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
        vec4 destColor = vec4(0.0);
        
        ${createweightingSource(kernelSize)}

        outColor = vec4((destColor / u_kernelWeight).rgb, 1);
    }`;

const createweightingSource = (kernelSize: number) => {
    const _kernelSize = getCorrectKernelSize(kernelSize);
    const halfSize = Math.floor(_kernelSize / 2);

    let source: string = '';

    for (let y = -halfSize; y <= halfSize; y++) {
        const leftSideIndex = (y + halfSize) * _kernelSize;
        for (let x = -halfSize; x <= halfSize; x++) {
            const index = leftSideIndex + (x + halfSize);
            source += /*glsl */ `destColor += texture(u_texture, v_texCoord + onePixel * vec2(${x}, ${y})) * u_kernel[${index}];`;
        }
    }
    return source;
};
