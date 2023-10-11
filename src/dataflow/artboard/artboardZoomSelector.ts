import { selector } from 'recoil';
import { renderViewScaleAtom } from '../renderview/renderViewScaleAtom';
import { artboardTransformAtom } from './artboardTransformAtom';
import { Vec2 } from 'application/core/units';

const artbordZoomSelector = selector<number>({
    key: 'artbordZoomSelector',
    get: ({ get }) => {
        const artboardTrans = get(artboardTransformAtom);
        const renderViewScale = get(renderViewScaleAtom);

        const widthZoom = artboardTrans.scale.x / renderViewScale.x;
        const heightZoom = artboardTrans.scale.y / renderViewScale.y;

        return Math.max(widthZoom, heightZoom);
    },
    set: ({ set, get }, newValue) => {
        if (typeof newValue === 'number') {
            const newScale = get(renderViewScaleAtom).times(newValue);

            set(artboardTransformAtom, ({ anchor, location, rotation }) => {
                return {
                    anchor,
                    location,
                    scale: newScale,
                    rotation,
                };
            });
        }
    },
});

export { artbordZoomSelector };
