import { selector } from 'recoil';
import { artboardResolutionAtom } from './artboardResolutionAtom';
import { artboardTransformAtom } from './artboardTransformAtom';

export const artbordZoomSelector = selector<number>({
    key: 'artbordZoomSelector',
    get: ({ get }) => {
        const artboardTrans = get(artboardTransformAtom);
        const renderViewScale = get(artboardResolutionAtom);

        const widthZoom = artboardTrans.scale.x / renderViewScale.x;
        const heightZoom = artboardTrans.scale.y / renderViewScale.y;

        return Math.max(widthZoom, heightZoom);
    },
    set: ({ set, get }, newValue) => {
        if (typeof newValue === 'number') {
            const newScale = get(artboardResolutionAtom).times(newValue);

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
