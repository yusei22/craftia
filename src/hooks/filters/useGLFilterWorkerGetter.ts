import { FilterConfigs, FilterWorker, GLFilter } from 'application/filters/Filter';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import { filterGLAtom } from 'dataflow/gl/filterGLAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useGLFilterWorkerGetter = () => {
    const getFilterGLSync = useRecoilValueSyncReader<WebGL2RenderingContext | null>();

    return <T extends FilterConfigs>(
        sprite: Rasterizedmage | SmartImage,
        filter: GLFilter<T>
    ): FilterWorker<T> | null => {
        const gl2 = getFilterGLSync(filterGLAtom);
        if (!gl2) {
            console.warn('gl2 is null');
            return null;
        }
        return filter.getWorker(gl2, sprite);
    };
};
