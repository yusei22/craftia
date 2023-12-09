import { RasterizedPreviewer } from './sprites/RasterizedPreviewer';
import { SmartImagePreviewer } from './sprites/SmartImagePreviewer';

export interface ISpriteExecutor {
    getPreviewSprite(): RasterizedPreviewer | SmartImagePreviewer;
}
