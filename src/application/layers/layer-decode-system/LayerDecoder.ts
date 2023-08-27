import { decodeMaskedLayer } from './masked';
import { decodeUndressedLayer } from './undressed';
import { DataURLDecoder } from 'application/data-url/decode-system/DataURLDecoder';
import { EncodedLayer } from 'application/types';
import { Vec2 } from 'application/units';

class LayerDecoder {
  readonly dataURLDecoder: DataURLDecoder;
  readonly projectSize: Vec2;

  constructor(dataURLDecoder: DataURLDecoder, projectSize: Vec2) {
    this.dataURLDecoder = dataURLDecoder;
    this.projectSize = projectSize.clone();
  }
  public async decode(encodedLayer: EncodedLayer) {
    if (encodedLayer.masking === null) {
      const source = await this.dataURLDecoder.decode(encodedLayer.imageData);

      return decodeUndressedLayer(encodedLayer, source);
    } else {
      const originalSource = await this.dataURLDecoder.decode(encodedLayer.imageData);
      const maskingSource = await this.dataURLDecoder.decode(encodedLayer.masking.imageData);

      return decodeMaskedLayer(encodedLayer, originalSource, maskingSource, this.projectSize);
    }
  }
}
export { LayerDecoder };
