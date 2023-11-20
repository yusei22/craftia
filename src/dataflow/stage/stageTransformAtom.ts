import { atom } from 'recoil';
import { Vec2 } from 'application/core/units';
export type StageTransform = {
    anchor: Vec2;
    location: Vec2;
    scale: Vec2;
    rotation: number;
};

export const stageTransformAtom = atom<StageTransform>({
    key: 'stageTransformAtom',
    default: {
        anchor: new Vec2(0.5, 0.5),
        location: new Vec2(0, 0),
        scale: new Vec2(1, 1),
        rotation: 0,
    },
});
