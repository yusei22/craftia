import { atom } from 'recoil';
import { Vec2 } from 'application/core/units';

const renderViewScaleAtom = atom<Vec2>({
    key: 'enderViewScaleAtom',
    default: new Vec2(1, 1),
});

export { renderViewScaleAtom };
