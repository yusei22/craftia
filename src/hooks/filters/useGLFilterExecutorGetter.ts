import { FilterConfigs, FilterExecutor, GLFilter } from 'application/filters/Filter';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import { filterGLAtom } from 'dataflow/gl/filterGLAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const useGLFilterExecutorGetter = () => {
    const getFilterGLSync = useRecoilValueSyncReader<WebGL2RenderingContext | null>();

    return <T extends FilterConfigs>(
        sprite: Rasterizedmage | SmartImage,
        filter: GLFilter<T>
    ): FilterExecutor<T> | null => {
        const gl2 = getFilterGLSync(filterGLAtom);

        if (!gl2) {
            console.warn('gl2 is null');
            return null;
        }
        return filter.getExecutor(gl2, sprite);
    };
};
