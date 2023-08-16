import { LayerSettings } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { createCanvasAnd2DContext } from 'application/canvas/createCanvas';
import { Vec2 } from 'application/units';

class EmptyLayer {
  public settings: LayerSettings;
  readonly source: HTMLCanvasElement;
  readonly systemSettings: SystemLayerSettings;
  constructor() {
    this.source = createCanvasAnd2DContext().canvas;
    this.source.width = 1;
    this.source.height = 1;
    this.settings = new LayerSettings();
    this.systemSettings = new SystemLayerSettings({ resize: new Vec2(1, 1) });
  }
}
export { EmptyLayer };
