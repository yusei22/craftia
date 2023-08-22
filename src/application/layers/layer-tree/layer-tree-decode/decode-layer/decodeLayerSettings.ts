import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { EncodedLayer } from 'application/types';
import { Vec2, Vec4 } from 'application/units';

const decodeLayerSettings = (encodedLayer: EncodedLayer): LayerSettings => {
  return new LayerSettings({
    name: encodedLayer.name,
    globalLocation: new Vec2(encodedLayer.globalLocation),
    visible: encodedLayer.visible,
    blendMode: encodedLayer.blendMode,
    opacity: encodedLayer.opacity,
    shadow:
      encodedLayer.shadow === null
        ? encodedLayer.shadow
        : {
            color: new Vec4(encodedLayer.shadow.color),
            shadowOffset: new Vec2(encodedLayer.shadow.shadowOffset),
            shadowBlur: encodedLayer.shadow.shadowBlur,
          },
  });
};
export { decodeLayerSettings };
