import { Vec2 } from "application/units";
import { applyBlendMode } from "../brendMode/index";
import { applyOpacity } from "../opacity/index";
import { applyShadow } from "../shadow/index";
import { drawImgae } from "../drawImgae/index";
import { Layer } from "application/types";
import { CroppingSettings } from "application/types";
type renderingOption = {
    parentGlobalLocation?: Vec2;
    parentOpacity?: number;
    cropping?: CroppingSettings;
}
function renderLayerCtx2D(context: CanvasRenderingContext2D, layer: Layer, { parentOpacity = 1, parentGlobalLocation = new Vec2(0, 0), cropping }: renderingOption = {}) {
    if (!layer.settings.visible) return;

    const relativeCoord = layer.settings.globalLocation.sub(parentGlobalLocation);

    applyOpacity(context, layer.settings.opacity, parentOpacity);
    applyBlendMode(context, layer.settings.blendMode);
    applyShadow(context, layer.settings.shadow);
    drawImgae(context, layer.source, relativeCoord, layer.systemSettings.resize, cropping);
}
export type { renderingOption }
export { renderLayerCtx2D }