import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { ILayer } from '../Ilayer';
import { WebGL2Consumer } from 'application/canvas/WebGL2Consumer';
import { Vec4 } from 'application/units';

abstract class WebGL2Layer extends WebGL2Consumer implements ILayer {
  public abstract settings: LayerSettings;
  public abstract systemSettings: SystemLayerSettings;
  constructor(gl2: WebGL2RenderingContext) {
    super(gl2);
  }
  public get canvas() {
    return this.getCanvas();
  }
  public get source() {
    return this.canvas;
  }
  public clear(color?: Vec4): void {
    super.clear(color);
  }
  public destroy(): void {
    super.destroy();
  }
  public useWebGl2ContextToChangeParam(func: (gl: WebGL2RenderingContext) => any): void {
    super.useWebGl2ContextToChangeParam(func);
  }
  public useWebGl2Context(
    funcWhenDrawable: (gl: WebGL2RenderingContext) => any,
    funcWhenNotDrawable?: (gl: WebGL2RenderingContext) => any
  ): void {
    super.useWebGl2Context(funcWhenDrawable, funcWhenNotDrawable);
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { WebGL2Layer };
