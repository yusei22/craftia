interface FilterConfig {}
type FilterSource = HTMLCanvasElement | ImageBitmap;

abstract class Filter<T extends FilterConfig> {
    abstract getFilterWorker(image: FilterSource): FilterWorker<T>;
}

abstract class FilterWorker<T extends FilterConfig> {
    abstract execute(config: T): void;
}

export type { FilterConfig, FilterSource };
export { Filter, FilterWorker };
