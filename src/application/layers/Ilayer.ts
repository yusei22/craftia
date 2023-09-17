import { RasterizedEditableLayer, SmartEditableLayer } from './editable';
import { StaticRasterizedEmptyLayer, StaticRasterizedLayer, StaticSmartObjectLayer } from './static-raw';
import { SystemLayerPrefs, LayerPrefs } from 'application/preferences';

type ILayerImageSource = HTMLCanvasElement | OffscreenCanvas | ImageBitmap | null;
type ILayerType = 'smart-object' | 'rasterized';
interface ILayer {
    readonly preferences: LayerPrefs;
    readonly systemPreferences: SystemLayerPrefs;
    readonly source: ILayerImageSource;
    readonly getLayerType: () => ILayerType;
    readonly toStatic: () => Promise<StaticLayer>;
}

type StaticLayer = StaticRasterizedLayer | StaticSmartObjectLayer | StaticRasterizedEmptyLayer;

function isStaticLayer(value: ILayer): value is StaticLayer {
    return (
        value instanceof StaticRasterizedLayer ||
        value instanceof StaticSmartObjectLayer ||
        value instanceof StaticRasterizedEmptyLayer
    );
}
type RasterizedLayer = StaticRasterizedLayer | RasterizedEditableLayer | StaticRasterizedEmptyLayer;

function isRasterizedLayer(value: ILayer): value is RasterizedLayer {
    return (
        value instanceof RasterizedEditableLayer ||
        value instanceof StaticRasterizedLayer ||
        value instanceof StaticRasterizedEmptyLayer
    );
}
type SmartObjectLayer = StaticSmartObjectLayer | SmartEditableLayer;
function isSmartObjectLayer(value: ILayer): value is SmartObjectLayer {
    return value instanceof SmartEditableLayer || value instanceof StaticSmartObjectLayer;
}

export type { ILayer, ILayerImageSource, StaticLayer, RasterizedLayer, SmartObjectLayer, ILayerType };
export { isStaticLayer, isRasterizedLayer, isSmartObjectLayer };
