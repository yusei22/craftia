import { Vec2 } from "application/units";
import { Layer } from "application/types";

function getMergerSize(layers: Layer[], mergerLocation: Vec2): Vec2 {
    if (layers.length <= 0) return new Vec2(0, 0);
    let maxglobalSizeX: number = layers[0].systemSettings.resize.x + layers[0].settings.globalLocation.x;
    let maxglobalSizeY: number = layers[0].systemSettings.resize.y + layers[0].settings.globalLocation.y;

    for (let i = 1; i < layers.length; i++) {
        maxglobalSizeX = Math.max(maxglobalSizeX, layers[i].systemSettings.resize.x + layers[i].settings.globalLocation.x);
        maxglobalSizeY = Math.max(maxglobalSizeY, layers[i].systemSettings.resize.y + layers[i].settings.globalLocation.y);
    }
    return new Vec2(maxglobalSizeX - mergerLocation.x, maxglobalSizeY - mergerLocation.y);
}
export { getMergerSize }