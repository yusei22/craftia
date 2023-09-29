import { ImageEditor, ImageEditorSource } from './ImageEditor';
import { Mat } from 'application/core/units';

const createFragmentShader = <T extends number>(kernel: Mat<T, T>) => /*glsl */ `#version 300 es
    precision highp float;

    uniform sampler2D u_texture;
    uniform float u_kernel[${kernel.width * kernel.heigth}];
    uniform float u_kernelWeight;

    in vec2 v_texCoord;
    out vec4 outColor;

    void main(){
        vec2 onePixel = vec2(1) / vec2(textureSize(u_texture, 0));
        vec4 destColor = vec4(0.0);
        
        ${createweightingSource(kernel.width)}

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

const isCorrectKernelSize = (kernel: Mat) => {
    if (kernel.width !== kernel.heigth) return false;
    return kernel.width % 2 === 1 && kernel.heigth % 2 === 1;
};

const getKernelWeight = <T extends number>(kernel: Mat<T, T>) => {
    let weight: number = 0.0;
    for (let i = 0; i < kernel.width * kernel.heigth; i++) {
        weight += kernel.item[i];
    }
    return weight;
};

class Convolution<T extends number = number> {
    private editor: ImageEditor;
    /**
     * @param image 処理する画像
     * @param kernel 畳み込み行列
     */
    constructor(image: ImageEditorSource, kernel: Mat<T, T>) {
        //カーネルサイズが無効の場合エラー
        if (!isCorrectKernelSize(kernel)) {
            throw Error('Invalid kernel size.');
        }

        this.editor = new ImageEditor(image, createFragmentShader(kernel));
        this.editor.listener[0] = ({ setUniformFloat }) => {
            //uniformに初期値を送り込む
            setUniformFloat('u_kernel', kernel.item);
            setUniformFloat('u_kernelWeight', getKernelWeight(kernel));
        };
    }
    /**
     * カーネルを変更
     * @param kernel 新しいカーネル
     */
    public changeKernel<U extends number>(kernel: Mat<U, U>) {
        if (!isCorrectKernelSize(kernel)) {
            throw Error('Invalid kernel size.');
        }
        this.editor.changeFragmentShader(createFragmentShader(kernel));
        this.editor.listener[0] = ({ setUniformFloat }) => {
            setUniformFloat('u_kernel', kernel.item);
            setUniformFloat('u_kernelWeight', getKernelWeight(kernel));
        };
    }
    /**
     * 実行
     * @param time 処理回数
     */
    public execute(time: number) {
        this.editor.executeMultiple(time);
    }
    /**
     * 結果を得る
     * @returns 処理結果
     */
    public getResult() {
        return this.editor.getResult();
    }
}

const getCorrectKernelSize = (size: number) => {
    const roundSize = Math.floor(size);
    return roundSize % 2 === 0 ? roundSize - 1 : roundSize;
};

export { Convolution, getCorrectKernelSize };
