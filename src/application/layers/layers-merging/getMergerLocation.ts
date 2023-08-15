import { Vec2 } from "application/units";
import { Layer } from "application/types";

function getMergerLocation(layers: Layer[]): Vec2 {
    if (layers.length <= 0) return new Vec2(0, 0)
    let minLocationX: number = layers[0].settings.globalLocation.x;
    let minLocationY: number = layers[0].settings.globalLocation.y;

    for (let i = 1; i < layers.length; i++) {
        minLocationX = Math.min(minLocationX, layers[i].settings.globalLocation.x);
        minLocationY = Math.min(minLocationY, layers[i].settings.globalLocation.y);
    }
    return new Vec2(minLocationX, minLocationY);
}
export { getMergerLocation };