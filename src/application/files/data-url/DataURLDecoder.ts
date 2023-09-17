class DataURLDecoder {
    async decode(dataurl: string) {
        const blob = await fetch(dataurl).then((res) => res.blob());
        return createImageBitmap(blob);
    }
}
export { DataURLDecoder };
