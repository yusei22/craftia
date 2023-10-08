import { atom } from 'recoil';
type ArtboardTransform = {
    anchor: [number, number];
    location: [number, number];
    scale: [number, number];
    rotation: number;
};

const artboardTransformAtom = atom<ArtboardTransform>({
    key: 'artboardTransform',
    default: {
        anchor: [0.5, 0.5],
        location: [0, 0],
        scale: [1, 1],
        rotation: 0,
    },
});
export type { ArtboardTransform };
export { artboardTransformAtom };
