import { Vec2 } from "../units";
import { Vec4 } from "../units";

abstract class WebGL2Consumer {
    constructor(gl2: WebGL2RenderingContext) {
        this.gl2 = gl2;
    }
    private gl2: WebGL2RenderingContext;
    private get drawable() {
        if (this.gl2.canvas.width <= 0 || this.gl2.canvas.height <= 0) return false;
        return true;
    }
    protected getCanvas() {
        return this.gl2.canvas as HTMLCanvasElement;
    }
    /**
     * コンテキストのパラメーターを変更する関数  ⚠ 描画時に使ってはいけない ⚠
     * @param func コンテキストに描画できる・できないにかかわらず呼ばれる関数 第一引数にはコンテキストが渡される
     */
    protected useWebGl2ContextToChangeParam(func: (gl: WebGL2RenderingContext) => any) {
        func(this.gl2)
    }
    /**
    * コンテキストで描画を行うための関数
    * @param funcWhenDrawable コンテキストに描画できる時に呼ばれる関数   第一引数にはコンテキストが渡される
    * @param funcWhenNotDrawable コンテキストに描画できない時に呼ばれる関数   第一引数にはコンテキストが渡される
    */
    protected useWebGl2Context(
        funcWhenDrawable: (gl: WebGL2RenderingContext) => any,
        funcWhenNotDrawable: (gl: WebGL2RenderingContext) => any = () => { return }
    ) {
        if (this.drawable) {
            funcWhenDrawable(this.gl2);
        }
        else {
            funcWhenNotDrawable(this.gl2);
        }
    }
    /**
     * リサイズ
     * @param size 大きさ
     */
    protected viewport(size: Vec2) {
        this.gl2.canvas.width = size.x;
        this.gl2.canvas.height = size.y;
        this.gl2.viewport(0, 0, this.gl2.canvas.width, this.gl2.canvas.height);
    }
    /**
     * canvasをクリア
     */
    protected clear(color: Vec4 = new Vec4(0, 0, 0, 0)) {
        this.useWebGl2Context((gl2: WebGL2RenderingContext) => {
            gl2.clearColor(color.x, color.y, color.z, color.w);
            gl2.clear(this.gl2.COLOR_BUFFER_BIT);
        })
    }
    /**
    * canvasサイズ0に
    */
    protected destroy() {
        this.viewport(new Vec2(0, 0));
    }
}
export { WebGL2Consumer };