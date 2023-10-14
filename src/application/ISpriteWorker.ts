import { RasterizedPreviewer } from './sprites/RasterizedPreviewer';
import { SmartImagePreviewer } from './sprites/SmartImagePreviewer';

export interface ISpriteWorker {
    getPreviewSprite(): RasterizedPreviewer | SmartImagePreviewer;
}
