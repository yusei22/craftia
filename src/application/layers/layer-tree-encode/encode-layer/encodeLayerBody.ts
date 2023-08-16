import {
  EncodedLayerBody,
  MaskedLayer,
  RasterizedLayer,
  SmartObjectLayer,
  isMaskedLayer,
  isRasterizedLayer,
  isSmartObjectLayer,
  Layer,
} from '../../../types';
import { LayerBase64Encoder } from '../encode-helper/LayerBase64Encoder';

const encodeSmartObjectLayerBody = (layer: SmartObjectLayer, base64Exporter: LayerBase64Encoder): EncodedLayerBody => {
  const data = base64Exporter.export(layer);

  return {
    imageData: data,
    type: 'smart-object',
    masking: null,
    resize: [layer.systemSettings.resize.x, layer.systemSettings.resize.y],
  };
};
const encodeRasterizedLayerBody = (layer: RasterizedLayer, base64Exporter: LayerBase64Encoder): EncodedLayerBody => {
  const data = base64Exporter.export(layer);

  return {
    imageData: data,
    type: 'rasterized',
    masking: null,
    resize: [layer.systemSettings.resize.x, layer.systemSettings.resize.y],
  };
};

const encodeMaskedLayerBody = (layer: MaskedLayer, base64Exporter: LayerBase64Encoder): EncodedLayerBody => {
  const exportUnmaskedLayerBody = (layer: RasterizedLayer | SmartObjectLayer): EncodedLayerBody => {
    if (isRasterizedLayer(layer)) {
      return encodeRasterizedLayerBody(layer, base64Exporter);
    }

    if (isSmartObjectLayer(layer)) {
      return encodeSmartObjectLayerBody(layer, base64Exporter);
    }

    return {
      imageData: '',
      type: 'rasterized',
      masking: null,
      resize: [0, 0],
    };
  };

  const {
    imageData: originalData,
    type: originalType,
    resize: originalResize,
  } = exportUnmaskedLayerBody(layer.originalLayer);

  const { imageData: maskingData } = encodeRasterizedLayerBody(layer.maskingSource, base64Exporter);

  return {
    imageData: originalData,
    type: originalType,
    resize: originalResize,
    masking: {
      imageData: maskingData,
      opacity: layer.maskOpacity,
    },
  };
};
const encodeLayerBody = (layer: Layer, base64Exporter: LayerBase64Encoder): EncodedLayerBody => {
  if (isRasterizedLayer(layer)) {
    return encodeRasterizedLayerBody(layer, base64Exporter);
  }

  if (isSmartObjectLayer(layer)) {
    return encodeSmartObjectLayerBody(layer, base64Exporter);
  }

  if (isMaskedLayer(layer)) {
    return encodeMaskedLayerBody(layer, base64Exporter);
  }

  return {
    imageData: '',
    type: 'rasterized',
    masking: null,
    resize: [0, 0],
  };
};
export { encodeLayerBody };
