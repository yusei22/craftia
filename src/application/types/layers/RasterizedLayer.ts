import { RasterizedImgBitmapLayer } from "application/layers/layers-body/rasterized/RasterizedImgBitmapLayer";
import { RasterizedImgElementLayer } from "application/layers/layers-body/rasterized/RasterizedImgElementLayer";
import { RasterizedCtx2DLayer } from "application/layers/layers-body/editing/rasterized/RasterizedCtx2DLayer";
import { RasterizedWebGL2Layer } from "application/layers/layers-body/editing/rasterized/RasterizedWebGL2Layer";
import { CompositeLayer } from "application/layers/layers-body/composite/CompositeLayer";
import { RasterizedBufferLayer } from "application/layers/layers-body/buffering/RasterizedBufferLayer";
import { EmptyLayer } from "application/layers/layers-body/empty/EmptyLayer";

type RasterizedLayer =
    | RasterizedImgBitmapLayer
    | RasterizedImgElementLayer
    | RasterizedCtx2DLayer
    | RasterizedWebGL2Layer
    | CompositeLayer
    | RasterizedBufferLayer
    | EmptyLayer

function isRasterizedLayer(value: any): value is RasterizedLayer {
    if (
        value instanceof RasterizedImgBitmapLayer ||
        value instanceof RasterizedImgElementLayer ||
        value instanceof RasterizedCtx2DLayer ||
        value instanceof RasterizedWebGL2Layer ||
        value instanceof CompositeLayer ||
        value instanceof EmptyLayer
    ) {
        return true
    }
    return false
}
export type { RasterizedLayer }
export { isRasterizedLayer }