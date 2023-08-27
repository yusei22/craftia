import { MaskingLayer } from "application/layers/layers-body";
import { useCreateContext2D } from "../canvas/useCreateContext2D";
import { RasterizedLayer, SmartObjectLayer } from "application/types";
import { Vec2 } from "application/units";

function useCreateMaskingLayer() {
    const createContext2D = useCreateContext2D();
    return (originalLayer: RasterizedLayer | SmartObjectLayer, maskingSourceLayer: RasterizedLayer, size: Vec2) => {
        return new MaskingLayer(createContext2D(), originalLayer, maskingSourceLayer, size);
    }
}
export { useCreateMaskingLayer };