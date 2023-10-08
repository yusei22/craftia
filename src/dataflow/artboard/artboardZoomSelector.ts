import { selector } from 'recoil';
import { renderViewScaleAtom } from '../renderview/renderViewScaleAtom';
import { artboardTransformAtom } from './artboardTransformAtom';
import { Vec2 } from 'application/core/units';

const artbordZoomSelector = selector<number>({
    key: 'artbordZoomSelector',
    get: ({ get }) => {
        const artboardTrans = get(artboardTransformAtom);
        const renderViewScale = get(renderViewScaleAtom);

        const widthZoom = artboardTrans.scale[0] / renderViewScale[0];
        const heightZoom = artboardTrans.scale[1] / renderViewScale[1];

        return Math.max(widthZoom, heightZoom);
    },
    set: ({ set, get }, newValue) => {
        if (typeof newValue === 'number') {
            const newScale = new Vec2(get(renderViewScaleAtom)).times(newValue).toArray();

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
