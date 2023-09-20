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
    private gl2: WebGL2RenderingContext;
    private vao: VertexArray;
    private ibo: IndexBuffer;
    private vbo: VertexBufer;
    private attributes: VertexAttribute[] = [];
    constructor(gl: WebGL2RenderingContext, indexData: IndexBufferData, vertexData: VertexBuferData) {
        this.gl2 = gl;
        this.vao = new VertexArray(this.gl2);
        this.ibo = new IndexBuffer(this.gl2).setData(indexData);
        this.vbo = new VertexBufer(this.gl2).setData(vertexData);
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
        this.ibo.bind();
        this.vbo.bind();
        this.attributes.forEach((attribute) => {
            attribute.setPointer(this.gl2);
        });
        this.vao.unbind();
        return this;
    }
}
export { VertexDataProvider };
