import { Vec2, Vec4 } from 'application/core/units';

class WebGL2 {
    protected canvas: HTMLCanvasElement | OffscreenCanvas;
    protected gl2: WebGL2RenderingContext;
    /**
     * キャンバスのサイズ
     */
    protected getResolution() {
        return new Vec2(this.canvas.width, this.canvas.height);
    }
    constructor() {
        [this.canvas, this.gl2] = createContextAndWebGL2();
    }
    /**
     * キャンバスを得る
     * @returns キャンバスを得る
     */
    protected getCanvas() {
        return this.canvas;
    }
    /**
     * リサイズ
     * @param size 大きさ
     */
    protected viewport(size: Vec2) {
        this.gl2.canvas.width = Math.max(size.x, 1);
        this.gl2.canvas.height = Math.max(size.y, 1);
        this.gl2.viewport(0, 0, this.gl2.canvas.width, this.gl2.canvas.height);
    }
    /**
     * canvasをクリア
     */
    protected clear(color: Vec4 = new Vec4(0, 0, 0, 1)) {
        this.gl2.clearColor(color.x, color.y, color.z, color.w);
        this.gl2.clear(this.gl2.COLOR_BUFFER_BIT);
        return this;
    }
}
function createContextAndWebGL2(): [HTMLCanvasElement, WebGL2RenderingContext] {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2 === null) {
        throw Error('Failed to get context 2D.');
    }
    return [canvas, gl2];
}
export { WebGL2 };
