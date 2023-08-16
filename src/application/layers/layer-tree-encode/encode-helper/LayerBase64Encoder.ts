import { ILayerImageSource, MaskingLayer } from '../../layers-body';
import { ImageRenderer } from 'application/image-utils/ImageRenderer';
import { Layer } from 'application/types';
import { Vec2 } from 'application/units';
class LayerBase64Encoder {
  private renderer: ImageRenderer;

  constructor() {
    this.renderer = new ImageRenderer();
  }

  private createDataURL(image: ILayerImageSource): string {
    this.renderer.clear();
    this.renderer.viewport(new Vec2(image.width, image.height));
    this.renderer.drawImage(image, new Vec2(0, 0));
    return this.renderer.toDataURL();
  }

  public export(layer: Layer) {
    return this.createDataURL(layer.source);
  }

  public exportMasking(maskingLayer: MaskingLayer) {
    const maskData = this.createDataURL(maskingLayer.maskingSource.source);
    const layerData = this.createDataURL(maskingLayer.originalLayer.source);
    return { maskData, layerData };
  }
}
export { LayerBase64Encoder };
