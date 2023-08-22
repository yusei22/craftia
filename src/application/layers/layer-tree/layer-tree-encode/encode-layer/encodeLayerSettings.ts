import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { EncodedLayerSettings } from 'application/types';
const encodeLayerSettings = (layerSettings: LayerSettings): EncodedLayerSettings => {
  return {
    name: layerSettings.name,
    globalLocation: [layerSettings.globalLocation.x, layerSettings.globalLocation.y],
    visible: layerSettings.visible,
    blendMode: layerSettings.blendMode,
    opacity: layerSettings.opacity,
    shadow: layerSettings.shadow
      ? {
          color: [
            layerSettings.shadow.color.x,
            layerSettings.shadow.color.y,
            layerSettings.shadow.color.z,
            layerSettings.shadow.color.y,
          ],
          shadowOffset: [layerSettings.shadow.shadowOffset.x, layerSettings.shadow.shadowOffset.y],
          shadowBlur: layerSettings.shadow.shadowBlur,
        }
      : null,
  };
};
export { encodeLayerSettings };
