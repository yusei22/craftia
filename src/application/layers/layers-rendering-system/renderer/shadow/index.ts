import { ShadowSettings } from "../../../layer-settings/LayerSettings";

export function applyShadow(context: CanvasRenderingContext2D, shadowSettings: ShadowSettings | null) {
    if (shadowSettings) {
        const color = shadowSettings.color;
        context.shadowColor = `rgba(${color.x},${color.y},${color.z},${color.w})`;
        context.shadowOffsetX = shadowSettings.shadowOffset.x;
        context.shadowOffsetY = shadowSettings.shadowOffset.y;
        context.shadowBlur = shadowSettings.shadowBlur;
        return;
    }
    context.shadowColor = 'rgba(0,0,0,0)';
}
