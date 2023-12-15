import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { filterGLAtom } from 'dataflow/gl/filterGLAtom';

export const FilterGLProvider = ({ children }: { children?: React.ReactNode }) => {
    const setFilterGL = useSetRecoilState(filterGLAtom);
    useEffect(() => {
        setFilterGL(createCanvasAndGL2().gl2);
    }, []);
    return children;
};

function createCanvasAndGL2(op?: WebGLContextAttributes) {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2', op);

    if (gl2 === null) {
        throw Error('Failed to get context 2D.');
    }
    return { canvas, gl2 };
}
