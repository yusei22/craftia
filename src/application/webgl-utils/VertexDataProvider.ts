import { Attribute } from './webgl/Attribute';
import { IBO, VBO, IndexBufferData, VertexBuferData } from './webgl/Buffer';
import { VAO } from './webgl/VAO';
class VertexDataProvider {
  private attributes: Attribute[] = [];
  private gl: WebGL2RenderingContext;
  private vao: VAO;
  private ibo: IBO;
  private vbo: VBO;
  readonly count: number;
  constructor(gl: WebGL2RenderingContext, indexData: IndexBufferData, vertexData: VertexBuferData) {
    this.gl = gl;
    this.vao = new VAO(this.gl);
    this.ibo = new IBO(this.gl, indexData);
    this.vbo = new VBO(this.gl, vertexData);
    this.count = indexData.length;
  }
  addAttribute(attribute: Attribute) {
    this.attributes.push(attribute);
  }
  transfer() {
    this.vao.bind();
    this.ibo.bind();
    this.vbo.bind();
    connectAttributes(this.gl, this.attributes);
    this.vao.unbind();
  }
  activate() {
    this.vao.bind();
  }
  deactivate() {
    this.vao.unbind();
  }
}
function connectAttributes(gl: WebGL2RenderingContext, attributes: Attribute[]) {
  attributes.forEach((xx) => {
    gl.enableVertexAttribArray(xx.location);
    gl.vertexAttribPointer(xx.location, xx.size, gl.FLOAT, false, xx.stride, xx.offset);
  });
}
export { VertexDataProvider };
