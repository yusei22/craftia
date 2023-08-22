import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { ILayer } from '../Ilayer';
import { Ctx2DConsumer } from 'application/canvas/Ctx2DConsumer';
import { Vec2 } from 'application/units';

abstract class Ctx2DLayer extends Ctx2DConsumer implements ILayer {
  public abstract settings: LayerSettings;
  public abstract systemSettings: SystemLayerSettings;
  constructor(fleshContext: CanvasRenderingContext2D) {
    super(fleshContext);
  }
  public get canvas() {
    return this.getCanvas();
  }
  public get source() {
    return this.canvas;
  }
  public clear(): void {
    super.clear();
  }
  public destroy(): void {
    super.destroy();
  }
  public useContext2DToChangeParam(func: (context: CanvasRenderingContext2D) => any): void {
    super.useContext2DToChangeParam(func);
  }
  public useContext2D(
    funcWhenDrawable: (context: CanvasRenderingContext2D) => any,
    funcWhenNotDrawable?: (context: CanvasRenderingContext2D) => any
  ): void {
    super.useContext2D(funcWhenDrawable, funcWhenNotDrawable);
  }

  public drawImage(souce: CanvasImageSource, location: Vec2): void;
  public drawImage(souce: CanvasImageSource, location: Vec2, resize: Vec2): void;
  public drawImage(
    souce: CanvasImageSource,
    croppingLocation: Vec2,
    croppingSize: Vec2,
    location: Vec2,
    resize: Vec2
  ): void;

  public drawImage(souce: CanvasImageSource, a: Vec2, b?: Vec2, c?: Vec2, d?: Vec2): void {
    if (b && c && d) {
      super.drawImage(souce, a, b, c, d);
      return;
    } else if (b) {
      super.drawImage(souce, a, b);
    } else {
      super.drawImage(souce, a);
    }
  }
  public getImageData(location: Vec2, size: Vec2): ImageData {
    return super.getImageData(location, size);
  }

  public putImageData(imageData: ImageData, location: Vec2): void;
  public putImageData(imageData: ImageData, location: Vec2, croppingLocation: Vec2, croppingSize: Vec2): void;
  public putImageData(imageData: ImageData, location: Vec2, croppingLocation?: Vec2, croppingSize?: Vec2): void {
    if (croppingLocation && croppingSize) {
      super.putImageData(imageData, location, croppingLocation, croppingSize);
    } else {
      super.putImageData(imageData, location);
    }
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { Ctx2DLayer };
