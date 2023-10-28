import { atom } from 'recoil';
import { Vec2, Vec4 } from 'application/core/units';
import { Pen } from 'application/pens/Pen';
import { NormalPen } from 'application/pens/normalpen';
import { FillSolid } from 'application/sprites/SpriteFill';

export const penAtom = atom<Pen>({
    key: 'penAtom',
    default: new NormalPen(new Vec2(1, 1), {
        stabilization: 0,
        realTimeStabilization: true,
        fillStyle: new FillSolid({ color: new Vec4(0, 0, 0, 1) }),
        blendMode: 'source-over',
        opacity: 1.0,
        lineWidth: 50,
    }),
});
