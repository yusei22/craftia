import {
    VertexAttribute,
    VertexArray,
    VertexBuferData,
    IndexBufferData,
    IndexBuffer,
    VertexBufer,
} from 'application/core/web-gl2';

class VertexDataProvider {
    public get bufferElementCount() {
        return this.ibo.length;
    }
    private gl: WebGL2RenderingContext;
    private vao: VertexArray;
    private ibo: IndexBuffer;
    private vbo: VertexBufer;
    private attributes: VertexAttribute[] = [];
    constructor(gl: WebGL2RenderingContext, indexData: IndexBufferData, vertexData: VertexBuferData) {
        this.gl = gl;
        this.vao = new VertexArray(this.gl);
        this.ibo = new IndexBuffer(this.gl).setData(indexData);
        this.vbo = new VertexBufer(this.gl).setData(vertexData);
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
    public addAttribute(attribute: VertexAttribute) {
        this.attributes.push(attribute);
        return this;
    }
    public transfer() {
        this.vao.bind();
        this.vbo.bind();
        this.ibo.bind();
        this.attributes.forEach((attribute) => {
            attribute.setPointer();
        });
        this.vao.unbind();
        return this;
    }
}
export { VertexDataProvider };
