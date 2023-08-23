import { LayerSettingsParam, LayerSettings } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { modifyAndRenderLayerCtx2D } from '../../layers-rendering-system/renderer/core/modifyAndRenderLayerCtx2D';
import { ILayer } from '../Ilayer';
import { Ctx2DConsumer } from 'application/canvas/Ctx2DConsumer';
import { RasterizedLayer, SmartObjectLayer } from 'application/types';
import { Vec2 } from 'application/units';

type MaskableLayer = RasterizedLayer | SmartObjectLayer;

type MaskingSource = RasterizedLayer;

class MaskingLayer<T extends MaskableLayer, U extends MaskingSource> extends Ctx2DConsumer implements ILayer {
  public originalLayer: T;
  public maskingSource: U;

  public maskOpacity: number = 1.0;
  public get canvas() {
    return this.getCanvas();
  }
  public get source() {
    return this.canvas;
  }
  public get settings() {
    return this.originalLayer.settings.cloneEdit({
      globalLocation: new Vec2(0, 0),
    });
  }
  public set settings(settings: LayerSettings) {
    this.originalLayer.settings = settings;
  }
  public get systemSettings() {
    return this._systemSettings;
  }
  private _systemSettings: SystemLayerSettings;

  private _context: CanvasRenderingContext2D;
  constructor(fleshContext: CanvasRenderingContext2D, originalLayer: T, maskingSource: U, size: Vec2) {
    super(fleshContext);
    this._context = fleshContext;

    this.originalLayer = originalLayer;
    this.maskingSource = maskingSource;
    this._systemSettings = new SystemLayerSettings({ resize: size });

    this.viewport(size);
    this.update();
  }
  public update() {
    this.clear();
    this.useContext2D((ctx: CanvasRenderingContext2D) => {
      modifyAndRenderLayerCtx2D(ctx, this.originalLayer, {
        visible: true,
        blendMode: 'source-over',
        opacity: 1.0,
        shadow: null,
      });

      modifyAndRenderLayerCtx2D(ctx, this.maskingSource, {
        globalLocation: new Vec2(0, 0),
        visible: true,
        blendMode: 'destination-out',
        opacity: this.maskOpacity,
        shadow: null,
      });
    });
  }
  public shallowCopy() {
    return new MaskingLayer<T, U>(
      this._context,
      this.originalLayer,
      this.maskingSource,
      new Vec2(this.canvas.width, this.canvas.height)
    );
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { MaskingLayer };
