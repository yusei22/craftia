import { createImageElement } from 'application/image-utils/createImageElement';

async function dataurlToImageBitmap(dataurl: string) {
  const blob = await fetch(dataurl).then((res) => res.blob());
  return createImageBitmap(blob);
}

async function dataurlToImageElement(dataurl: string) {
  return createImageElement(dataurl);
}
export { dataurlToImageBitmap, dataurlToImageElement };
