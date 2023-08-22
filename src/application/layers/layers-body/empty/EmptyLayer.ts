import { LayerSettings, LayerSettingsParam } from '../../layer-settings/LayerSettings';
import { SystemLayerSettings } from '../../layer-settings/SystemLayerSettings';
import { Vec2 } from 'application/units';

class EmptyLayer {
  public settings: LayerSettings;
  readonly source: HTMLCanvasElement;
  readonly systemSettings: SystemLayerSettings;
  constructor(fleshContext: CanvasRenderingContext2D, layerSettings?: LayerSettings) {
    this.source = fleshContext.canvas;
    this.source.width = 1;
    this.source.height = 1;
    this.settings = layerSettings ? layerSettings.clone() : new LayerSettings();
    this.systemSettings = new SystemLayerSettings({ resize: new Vec2(1, 1) });
  }
  public editSettings(editItem: Partial<LayerSettingsParam>) {
    this.settings = this.settings.cloneEdit(editItem);
    return this;
  }
}
export { EmptyLayer };
