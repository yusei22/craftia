import { Renderer } from '../Renderer';
import { AbstractBuffer } from '../buffer/AbstractBuffer';
import { IndexBuffer } from '../buffer/IndexBuffer';
import { VertexBuffer } from '../buffer/VertexBuffer';
import { Shader } from '../shader';
import { Attribute } from './Attribute';
import { VertexArray } from './VertexArray';

/**
 * 頂点バッファと頂点属性のモデルを表す
 *
 * @example
 *
 * const geometry = new Geometry();
 *
 * geometry.addAttribute('a_texCoord',[ 0.0, 0.0, 0.0, 1.0, 1.0,  0.0 ,1.0, 1.0 ], 2);
 * geometry.addIndex([0, 1, 2, 1, 3, 2]);
 *
 */
export class Geometry {
    public indexBuffer: IndexBuffer | null;
    public buffers: AbstractBuffer[];
    public attributes: Attribute[];

    private updateID: number;

    /**
     * VAO
     */
    public vao: VertexArray | null;

    private gl: WebGL2RenderingContext | null;

    constructor() {
        this.indexBuffer = null;
        this.buffers = [];
        this.attributes = [];
        this.vao = null;
        this.gl = null;

        this.updateID = 0;
    }

    /**
     * 頂点バッファと頂点属性を追加
     * @param id 頂点属性の名前
     * @param buffer 頂点バッファ
     * @param size 頂点のサイズ
     */
    public addAttribute(
        id: string,
        buffer: VertexBuffer | Float32Array | number[],
        size: number
    ): this {
        let _buffer: VertexBuffer;

        if (buffer instanceof VertexBuffer) {
            _buffer = buffer;
        } else {
            const bufferData = buffer instanceof Array ? new Float32Array(buffer) : buffer;

            _buffer = new VertexBuffer(bufferData);
        }

        let bufferIndex = this.buffers.indexOf(_buffer);

        if (bufferIndex === -1) {
            this.buffers.push(_buffer);

            bufferIndex = this.buffers.length - 1;
        }
        const attribute = new Attribute(bufferIndex, id, size, 0, 0);
        this.attributes.push(attribute);

        return this;
    }

    /**
     * 頂点属性を取得
     * @param id 頂点属性の名前
     * @returns 頂点属性またはnull
     */
    public getAttribute(id: string) {
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].id === id) return this.attributes[i];
        }
        return null;
    }

    /**
     * 頂点属性に紐づいた頂点バッファを取得
     * @param id 頂点属性の名前
     * @returns 頂点バッファまたはnull
     */
    public getBuffer(id: string): AbstractBuffer | null {
        const bufferIndex = this.getAttribute(id)?.buffer;

        return bufferIndex ? this.buffers[bufferIndex] : null;
    }

    /**
     * インデックスバッファをセット
     * @param buffer インデックスバッファ
     */
    public addIndex(buffer: IndexBuffer | Int16Array | number[]): this {
        let _buffer: IndexBuffer;

        if (buffer instanceof IndexBuffer) {
            _buffer = buffer;
        } else {
            const bufferData = buffer instanceof Array ? new Int16Array(buffer) : buffer;

            _buffer = new IndexBuffer(bufferData);
        }

        this.indexBuffer = _buffer;
        this.buffers.push(_buffer);
        return this;
    }

    /**
     * インデックスバッファを取得
     * @returns インデックスバッファまたはnull
     */
    public getIndex(): IndexBuffer | null {
        return this.indexBuffer;
    }

    /**
     * 現在の全ての属性が単一のバッファを使うようにバッファをインタリーブする
     * パフォーマンス改善のため。
     *
     * 現時点ではバッファのデータ頂点属性ごとに配置している。
     * (ただし、データを頂点ごとにまとめて配置するほうがメモリアクセスの観点から有利になる)
     * @returns
     */
    public interleave(): this {
        //インタリーブ済みかチェックする
        if (this.buffers.length === 1 || (this.indexBuffer && this.buffers.length === 2))
            return this;

        let offset: number = 0;
        const array: number[] = [];
        const attributes: Attribute[] = [];

        for (let i = 0; i < this.attributes.length; i++) {
            const attribute = this.attributes[i];
            const buffer = this.buffers[attribute.buffer];

            array.push(...Array.from(buffer.data));

            attributes[i] = new Attribute(
                0,
                attribute.id,
                attribute.size,
                0,
                attribute.offset + offset
            );
            offset += buffer.data.length * Float32Array.BYTES_PER_ELEMENT;

            buffer.destroy();
        }
        this.attributes = attributes;
        this.buffers = this.indexBuffer
            ? [new VertexBuffer(new Float32Array(array)), this.indexBuffer]
            : [new VertexBuffer(new Float32Array(array))];

        return this;
    }

    /**
     * ジオメトリを破棄する
     */
    public destroy(): this {
        this.indexBuffer = null;
        this.buffers = [];
        this.attributes = [];

        this.vao?.destroy();
        this.vao = null;

        return this;
    }

    /**
     * VAOを作成して保存する
     * @param gl2 WebGL2RenderingContext
     * @returns VAO
     */
    protected generateVao(gl2: WebGL2RenderingContext) {
        return (this.vao = new VertexArray(gl2));
    }

    protected linkGL(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.vao) {
            return this.vao;
        }
        this.gl = gl;
        return this.generateVao(this.gl);
    }
    public update(renderer: Renderer, shader: Shader): this {
        const vao = this.linkGL(renderer.gl2);

        if (vao.updateID === this.updateID && vao.shaderID === shader.program.uid) {
            this.buffers.forEach((b) => {
                renderer.buffer.update(b);
            });
            return this;
        }

        vao.updateID = this.updateID;
        vao.shaderID = shader.program.uid;

        vao.bind();

        this.buffers.forEach((b) => {
            renderer.buffer.update(b);
            renderer.buffer.bind(b);
        });
        this.attributes?.forEach((a) => {
            a.setPointer(renderer.gl2, shader.program.getAttribLocation(a.id) ?? -1);
        });
        vao.unbind();
        return this;
    }
    public bind(gl: WebGL2RenderingContext): this {
        const vao = this.linkGL(gl);
        vao.bind();
        return this;
    }
}
