import { Vec2, Vec4 } from 'application/units';

interface LayerSettingsParam {
  name: string;
  globalLocation: Vec2;
  visible: boolean;
  blendMode: GlobalCompositeOperation;
  opacity: number;
  shadow: ShadowSettings | null;
}

type ShadowSettings = {
  color: Vec4;
  shadowOffset: Vec2;
  shadowBlur: number;
};

const cloneShadowSettings = (shadowSettings: ShadowSettings | null) => {
  return shadowSettings ? { ...shadowSettings } : null;
};

class LayerSettings implements LayerSettingsParam {
  readonly name: string;
  readonly globalLocation: Vec2;
  readonly visible: boolean;
  readonly blendMode: GlobalCompositeOperation;
  readonly opacity: number;
  readonly shadow: ShadowSettings | null;

  constructor({ name, globalLocation, visible, blendMode, opacity, shadow }: Partial<LayerSettingsParam> = {}) {
    this.name = name ?? '';
    this.globalLocation = globalLocation ? globalLocation.clone() : new Vec2(0, 0);
    this.visible = visible ?? true;
    this.blendMode = blendMode ?? 'source-over';
    this.opacity = opacity ?? 1.0;
    this.shadow = shadow ?? null;
  }

  clone() {
    return new LayerSettings({
      name: this.name,
      globalLocation: this.globalLocation.clone(),
      visible: this.visible,
      blendMode: this.blendMode,
      opacity: this.opacity,
      shadow: cloneShadowSettings(this.shadow),
    });
  }

  cloneEdit(editedSettings: Partial<LayerSettingsParam>) {
    return new LayerSettings({
      name: editedSettings.name ?? this.name,
      globalLocation: editedSettings.globalLocation
        ? editedSettings.globalLocation.clone()
        : this.globalLocation.clone(),
      visible: editedSettings.visible ?? this.visible,
      blendMode: editedSettings.blendMode ?? this.blendMode,
      opacity: editedSettings.opacity ?? this.opacity,

      shadow:
        typeof editedSettings.shadow === 'undefined'
          ? cloneShadowSettings(this.shadow)
          : cloneShadowSettings(editedSettings.shadow),
    });
  }
}
export type { ShadowSettings, LayerSettingsParam };
export { LayerSettings };
