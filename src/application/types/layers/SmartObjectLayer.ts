import { SmartImgBitmapLayer } from "application/layers/layers-body/smart-object/SmartImgBitmapLayer";
import { SmartImgElementLayer } from "application/layers/layers-body/smart-object/SmartImgElementLayer";
import { SmartCtx2DLayer } from "application/layers/layers-body/editing/smart-object/SmartCtx2DLayer";
import { SmartWebGL2Layer } from "application/layers/layers-body/editing/smart-object/SmartWebGL2Layer";
type SmartObjectLayer =
    | SmartImgBitmapLayer
    | SmartImgElementLayer
    | SmartCtx2DLayer
    | SmartWebGL2Layer

function isSmartObjectLayer(value: any): value is SmartObjectLayer {
    if (
        value instanceof SmartImgBitmapLayer ||
        value instanceof SmartImgElementLayer ||
        value instanceof SmartCtx2DLayer ||
        value instanceof SmartWebGL2Layer
    ) {
        return true
    }
    return false
}
export type { SmartObjectLayer }
export { isSmartObjectLayer }