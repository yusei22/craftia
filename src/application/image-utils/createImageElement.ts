async function createImageElement(src: string): Promise<HTMLImageElement> {
  const newImage = new Image();
  return new Promise<HTMLImageElement>((resolve, reject) => {
    newImage.onload = () => {
      resolve(newImage);
    };
    newImage.onerror = () => {
      reject('Failed to create HTMLImageElement');
    };
    newImage.src = src;
  });
}
export { createImageElement };
