import { Renderer } from '../Renderer';
import { Shader } from '../shader/Shader';
import { UniformGroup } from './UniformGroup';

export class UniformGroupManager {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }
    public transfer(unifoms: UniformGroup, shader?: Shader) {
        const _shader = shader || this.renderer.shader.shader;
        if (!_shader) {
            return;
        }
        unifoms.transfer(_shader);
    }
}
