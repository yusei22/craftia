import { Vec2 } from 'application/core/units';
import {
    TexPixcels,
    Texture2D,
    RendererShader,
    RendererBufferData,
    IUniformValue,
    CacheableRenderer,
} from 'application/core/web-gl2';

const VERTEX_SIZE = 2;
const TEXTURE_SIZE = 2;
const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT;
const VERTEX_OFFSET = 0;
const TEXTURE_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;

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

function createBufferData(location: Vec2, texSize: Vec2) {
    const x1 = location.x;
    const x2 = location.x + texSize.x;
    const y1 = location.y;
    const y2 = location.y + texSize.y;

    const vertexData = new Float32Array([
        x1, y1, 0.0, 0.0, // eslint-disable-line
        x1, y2, 0.0, 1.0, // eslint-disable-line
        x2, y1, 1.0, 0.0, // eslint-disable-line
        x2, y2, 1.0, 1.0, // eslint-disable-line
    ]);
    const indexData = new Int16Array([0, 1, 2, 1, 3, 2]);
    return new RendererBufferData(indexData, vertexData);
}

function createCustomShader(fragmentShaderSource: string) {
    return new RendererShader({
        fragmentShader: fragmentShaderSource,
        vertexShader: vertexShaderSource,
        attributes: [
            {
                name: 'a_position',
                size: VERTEX_SIZE,
                stride: STRIDE,
                offset: VERTEX_OFFSET,
            },
            {
                name: 'a_texCoord',
                size: TEXTURE_SIZE,
                stride: STRIDE,
                offset: TEXTURE_OFFSET,
            },
        ],
    });
}
class ImageEditorSource {
    readonly source: TexPixcels;
    readonly size: Vec2;
    constructor(image: TexPixcels, imageSize: Vec2) {
        this.source = image;
        this.size = imageSize;
    }
}

type ListenerProps = {
    setUniformInt: (name: string, value: IUniformValue) => void;
    setUniformFloat: (name: string, value: IUniformValue) => void;
    setUniformTexture: (name: string, value: Texture2D) => void;
};

class ImageEditor {
    /**レンダリング時実行する関数 */
    public listener: ((pops: ListenerProps) => void)[] = [];

    private renderer: CacheableRenderer;
    private texture: Texture2D;

    constructor(image: ImageEditorSource, fragmentShaderSource: string) {
        const bufferData = createBufferData(new Vec2(0, 0), image.size);
        const shader = createCustomShader(fragmentShaderSource);

        this.renderer = new CacheableRenderer(bufferData, shader, image.size);
        this.renderer.viewport(image.size);

        this.texture = this.renderer.createTexture2D().attachImage(image.source, image.size);
    }
    /**
     * フラグメントシェーダーを変更する
     * @param fragmentShaderSource 
     */
    public changeFragmentShader(fragmentShaderSource: string) {
        const shader = this.renderer.compileShader(
            createCustomShader(fragmentShaderSource)
        );
        this.renderer.setCompiledShader(shader);
    }
    /**
     * 実行結果を得る
     * @returns
     */
    public getResult() {
        return this.renderer.getCanvas();
    }
    /**
     * 一回のみ実行
     */
    public execute() {
        this.renderer.activate();

        //`uniform`に値を送り込む
        this.renderer
            .setUniformSampler2D('u_texture', this.texture) //テクスチャ
            .setUniformFloat('u_resolution', this.renderer.getResolution()) //画面の解像度
            .setUniformFloat('u_flipY', -1.0) //上下反転させる


        this.listener[0]?.(this.getListenerPorops());

        this.renderer.render();
        this.renderer.deactivate();
    }
    /**
     * 複数回実行
     * @param time 実行回数
     */
    public executeMultiple(time: number) {
        this.renderer.activate();

        //`uniform`に初期値を送り込む
        this.renderer
            .setUniformSampler2D('u_texture', this.texture)//テクスチャ
            .setUniformFloat('u_flipY', 1.0) //上下反転しない
            .setUniformFloat('u_resolution', this.renderer.getResolution()) //画面の解像度

        let count = 0;

        for (let i = 0; i < time - 1; i++) {
            this.listener[i]?.(this.getListenerPorops());

            //テクスチャにキャッシュする
            this.renderer.renderToCache();

            //次のレンダリングでキャッシュしたテクスチャ使う
            this.renderer.setUniformSampler2D('u_texture', this.renderer.getCacheTex());

            count++;
        }
        this.renderer.setUniformFloat('u_flipY', -1.0); //最後に上下反転する
        this.listener[count]?.(this.getListenerPorops());

        this.renderer.render();
        this.renderer.deactivate();
    }
    /**
     * レンダリング時のリスナーに送るプロップスを得る
     * @returns 
     */
    private getListenerPorops() {
        return {
            setUniformFloat: (name: string, value: IUniformValue) => {
                this.renderer.setUniformFloat(name, value);
            },
            setUniformInt: (name: string, value: IUniformValue) => {
                this.renderer.setUniformInt(name, value);
            },
            setUniformTexture: (name: string, value: Texture2D) => {
                this.renderer.setUniformSampler2D(name, value);
            },
        };
    }
}

export { ImageEditor, ImageEditorSource };
