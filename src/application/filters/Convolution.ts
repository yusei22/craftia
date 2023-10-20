import { Vec2, Mat } from 'application/core/units';
import { TexPixcels } from 'application/core/web-gl2';
import { EditorShader, ImageEditor } from './ImageEditor';

type ConvolutionListenerProps<T extends number> = {
    setKernel(kernel: Mat<T>): void;
}

export class Convolution<T extends number>{
    private editor: ImageEditor;
    private kernelSize: number;
    public listeners: ((props: ConvolutionListenerProps<T>) => void)[] = [];

    constructor(image: TexPixcels, imageSize: Vec2, kernel: Mat<T, T>) {
        this.kernelSize = getCorrectKernelSize(Math.min(kernel.width, kernel.heigth));

        const shader: EditorShader = {
            fragmentShaderSource: createFragmentShader(this.kernelSize),
            uniforms: [
                {
                    name: 'u_kernel',
                    type: 'float',
                    value: kernel.item
                },
                {
                    name: 'u_kernelWeight',
                    type: 'float',
                    value: getKernelWeight(kernel, this.kernelSize)
                }
            ]
        }
        this.editor = new ImageEditor(imageSize, shader);
        this.editor.setImage(image, imageSize, false);
    }
    public execute(time: number) {
        this.listeners.forEach((listener, i) => {
            this.editor.listeners[i] = ({ setUniformFloat }) => {
                listener({
                    setKernel: (kernel) => {
                        setUniformFloat('u_kernel', kernel.item)
                        setUniformFloat('u_kernelWeight', getKernelWeight(kernel, this.kernelSize))
                    }
                })
            }
        })
        this.editor.execute(time);
    }
    public getResult() {
        return this.editor.getResult()
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
const createFragmentShader = (kernelSize: number) => /*glsl */ `#version 300 es
    precision highp float;

    uniform sampler2D u_texture;
    uniform float u_kernel[${kernelSize * kernelSize}];
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
    const halfSize = Math.floor(kernelSize / 2);

    let source: string = '';

    for (let y = -halfSize; y <= halfSize; y++) {
        const leftSideIndex = (y + halfSize) * kernelSize;
        for (let x = -halfSize; x <= halfSize; x++) {
            const index = leftSideIndex + (x + halfSize);
            source += /*glsl */ `destColor += texture(u_texture, v_texCoord + onePixel * vec2(${x}, ${y})) * u_kernel[${index}];`;
        }
    }
    return source;
};