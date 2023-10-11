import { atom } from 'recoil';
import { Vec2 } from 'application/core/units';
type ArtboardTransform = {
    anchor: Vec2;
    location: Vec2;
    scale: Vec2;
    rotation: number;
};

const artboardTransformAtom = atom<ArtboardTransform>({
    key: 'artboardTransform',
    default: {
        anchor: new Vec2(0.5, 0.5),
        location: new Vec2(0, 0),
        scale: new Vec2(1, 1),
        rotation: 0,
    },
});
export type { ArtboardTransform };
export { artboardTransformAtom };
