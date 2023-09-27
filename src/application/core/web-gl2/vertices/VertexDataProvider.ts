import {
    VertexAttribute,
    VertexArray,
    VertexBuferData,
    IndexBufferData,
    IndexBuffer,
    VertexBufer,
    Program,
} from 'application/core/web-gl2';

abstract class VertexDataProvider {
    public get bufferElementCount() {
        return this.ibo.length;
    }
    private gl2: WebGL2RenderingContext;
    private vao: VertexArray;
    private ibo: IndexBuffer;
    private vbo: VertexBufer;
    constructor(
        gl: WebGL2RenderingContext,
        indexData: IndexBufferData,
        vertexData: VertexBuferData
    ) {
        this.gl2 = gl;
        this.vao = new VertexArray(this.gl2);
        this.ibo = new IndexBuffer(this.gl2).setData(indexData);
        this.vbo = new VertexBufer(this.gl2).setData(vertexData);
        this.setBufferToVAO();
        return this;
    }
    public activate() {
        this.vao.bind();
        return this;
    }
    public deactivate() {
        this.vao.unbind();
        return this;
    }
    protected addAttributes(...attributes: VertexAttribute[]) {
        this.vao.bind();
        attributes.forEach((attribute) => {
            attribute.setPointer(this.gl2);
        });
        this.vao.unbind();
        return this;
    }
    private setBufferToVAO() {
        this.vao.bind();
        this.ibo.bind();
        this.vbo.bind();
        this.vao.unbind();
    }
    abstract setAttrsFrom(program: Program): this;
}
export { VertexDataProvider };
