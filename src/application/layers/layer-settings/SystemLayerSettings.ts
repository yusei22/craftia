import { Vec2 } from 'application/units';

interface SystemLayerSettingsParam {
  resize: Vec2;
}
class SystemLayerSettings implements SystemLayerSettingsParam {
  readonly resize: Vec2;

  constructor({ resize }: SystemLayerSettingsParam) {
    this.resize = resize.clone();
  }

  public cloneEdit(editedSettings: Partial<SystemLayerSettingsParam>) {
    return new SystemLayerSettings({
      resize: editedSettings.resize ? editedSettings.resize.clone() : this.resize.clone(),
    });
  }

  public clone() {
    return new SystemLayerSettings({
      resize: this.resize.clone(),
    });
  }
}
export type { SystemLayerSettingsParam };
export { SystemLayerSettings };
