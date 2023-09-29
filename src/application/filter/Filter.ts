interface FilterConfig { }
type FilterSource = HTMLCanvasElement | ImageBitmap

abstract class Filter {
    abstract getFilterWorker(image: FilterSource): FilterWorker
}

abstract class FilterWorker {
    abstract execute(): void;
    abstract getParamChangeInput(): React.JSX.Element;
}

export type { FilterConfig, FilterSource }
export { Filter, FilterWorker }