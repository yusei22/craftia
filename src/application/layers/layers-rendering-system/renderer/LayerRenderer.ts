import { renderLayerCtx2D } from './core/renderLayerCtx2D';
import { Ctx2DConsumer } from 'application/canvas/Ctx2DConsumer';
import { createCanvasAnd2DContext } from 'application/canvas/createCanvas';
import { CroppingSettings, Layer } from 'application/types';
import { Vec2 } from 'application/units';

type DrawSettings = {
  cropping?: CroppingSettings;
  opacity?: number;
};
class LayerRenderer extends Ctx2DConsumer {
  constructor(size?: Vec2) {
    super(createCanvasAnd2DContext().context);
    if (size) this.viewport(size);
  }
  public get canvas() {
    return super.getCanvas();
  }
  public clear(): void {
    super.clear();
  }
  public viewport(size: Vec2): void {
    super.viewport(size);
  }
  public redraw(layers: Layer[], drawSettings?: DrawSettings) {
    this.clear();
    this.drawAbove(layers, drawSettings);
  }
  public drawAbove(layers: Layer[], { opacity = 1.0, cropping }: DrawSettings = {}) {
    if (layers.length <= 0) return;

    this.useContext2D((ctx: CanvasRenderingContext2D) => {
      if (cropping) {
        this.viewport(cropping.size);
        layers.forEach((layer) => {
          renderLayerCtx2D(ctx, layer, {
            parentGlobalLocation: cropping.upperLeft,
            parentOpacity: opacity,
          });
        });
      } else {
        layers.forEach((layer) => {
          renderLayerCtx2D(ctx, layer, {
            parentGlobalLocation: new Vec2(0, 0),
            parentOpacity: opacity,
          });
        });
      }
    });
  }
}
export { LayerRenderer };
