import { LayerSettings } from '../../../layer-settings/LayerSettings';
import { applyBlendMode } from '../brendMode/index';
import { drawImgae } from '../drawImgae/index';
import { applyOpacity } from '../opacity/index';
import { applyShadow } from '../shadow/index';
import { renderingOption } from './renderLayerCtx2D';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';
function modifyAndRenderLayerCtx2D(
  context: CanvasRenderingContext2D,
  layer: Layer,
  { globalLocation, visible, blendMode, opacity, shadow }: Partial<LayerSettings> = {},
  { parentOpacity = 1, parentGlobalLocation = new Vec2(0, 0), cropping }: renderingOption = {}
) {
  if (typeof visible === 'undefined') {
    if (!layer.settings.visible) return;
  } else {
    if (!visible) return;
  }
  const relativeCoord = globalLocation
    ? globalLocation.sub(parentGlobalLocation)
    : layer.settings.globalLocation.sub(parentGlobalLocation);
  applyOpacity(context, opacity ?? layer.settings.opacity, parentOpacity);
  applyBlendMode(context, blendMode ?? layer.settings.blendMode);
  applyShadow(context, shadow ?? layer.settings.shadow);
  drawImgae(context, layer.source, relativeCoord, layer.systemSettings.resize, cropping);
}
export { modifyAndRenderLayerCtx2D };
