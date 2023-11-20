import { atom } from 'recoil';

const filterGLAtom = atom<WebGL2RenderingContext | null>({
    key: 'filterGLAtom',
    default: null,
});

export { filterGLAtom };
