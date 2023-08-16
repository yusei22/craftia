import { ILayerImageSource } from '../../../layers-body/Ilayer';
import { CroppingSettings } from 'application/types';
import { Vec2 } from 'application/units';
export function drawImgae(
  context: CanvasRenderingContext2D,
  source: ILayerImageSource,
  location: Vec2,
  resize: Vec2,
  cropping?: CroppingSettings
) {
  if (!isDrawableSource(source)) return;
  if (cropping) {
    context.drawImage(
      source,
      cropping.upperLeft.x,
      cropping.upperLeft.y,
      cropping.size.x,
      cropping.size.y,
      location.x,
      location.y,
      resize.x,
      resize.y
    );
    return;
  } else {
    context.drawImage(source, location.x, location.y, resize.x, resize.y);
  }
}
function isDrawableSource(source: ILayerImageSource): boolean {
  if (source.width > 0 && source.height > 0) return true;
  else return false;
}
