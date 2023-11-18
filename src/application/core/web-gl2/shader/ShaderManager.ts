import { Renderer } from '../Renderer';
import { Shader } from './Shader';

export class ShaderManager {
    private renderer: Renderer;
    private _shader: Shader | null;

    public get shader() {
        return this._shader;
    }
    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this._shader = null;
    }
    public bind(shader: Shader) {
        if (this._shader === shader) return;

        shader.bind();
        this._shader = shader;
    }
    public compile(shader: Shader) {
        shader.program.compile(this.renderer.gl2);
    }
}
