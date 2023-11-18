import { Renderer } from '../Renderer';
import { AbstractBuffer } from './AbstractBuffer';
import { BufferType } from './GLBuffer';

export class BufferManager {
    private readonly renderer: Renderer;
    private readonly gl: WebGL2RenderingContext;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.gl = this.renderer.gl2;
    }

    /**
     * バッファを更新する
     * @param buffer
     */
    public update(buffer: AbstractBuffer) {
        buffer.update(this.gl);
    }
    public bind(buffer: AbstractBuffer) {
        buffer.bind(this.gl);
    }
    public unbind(type: BufferType) {
        this.renderer.gl2.bindBuffer(type, null);
    }
}
