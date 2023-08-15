import { Vec4 } from "application/units";
import { WebGL2Consumer } from "../../../canvas/WebGL2Consumer";
import { createCanvasAndWebGL2Context } from "../../../canvas/createCanvas";
import { LayerSettings } from "../../layer-settings/LayerSettings";
import { SystemLayerSettings } from "../../layer-settings/SystemLayerSettings";
import { ILayer } from "../Ilayer";
abstract class WebGL2Layer extends WebGL2Consumer implements ILayer {
    public abstract settings: LayerSettings;
    public abstract systemSettings: SystemLayerSettings;
    constructor() {
        super(createCanvasAndWebGL2Context().gl2);
    }
    public get canvas(){
        return this.getCanvas();
    }
    public get source() {
        return this.canvas
    }
    public clear(color?: Vec4): void {
        super.clear(color);
    }
    public destroy(): void {
        super.destroy();
    }
    public useWebGl2ContextToChangeParam(func: (gl: WebGL2RenderingContext) => any): void {
        super.useWebGl2ContextToChangeParam(func)
    }
    public useWebGl2Context(
        funcWhenDrawable: (gl: WebGL2RenderingContext) => any,
        funcWhenNotDrawable?: (gl: WebGL2RenderingContext) => any): void {
        super.useWebGl2Context(funcWhenDrawable, funcWhenNotDrawable);
    }
}
export { WebGL2Layer };