async function dataurlToImageBitmap(dataurl: string) {
    const blob = await fetch(dataurl).then((res) => res.blob());
    return createImageBitmap(blob);
}

class DataURLDecoder {
    decode(dataurl: string) {
        return dataurlToImageBitmap(dataurl);
    }
}
export { DataURLDecoder };