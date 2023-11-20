import { selector } from 'recoil';
import { stageResolutionAtom } from './stageResolutionAtom';
import { stageTransformAtom } from './stageTransformAtom';

export const stageZoomSelector = selector<number>({
    key: 'stageZoomSelector',
    get: ({ get }) => {
        const stageTrans = get(stageTransformAtom);
        const renderViewScale = get(stageResolutionAtom);

        const widthZoom = stageTrans.scale.x / renderViewScale.x;
        const heightZoom = stageTrans.scale.y / renderViewScale.y;

        return Math.max(widthZoom, heightZoom);
    },
    set: ({ set, get }, newValue) => {
        if (typeof newValue === 'number') {
            const newScale = get(stageResolutionAtom).times(newValue);

            set(stageTransformAtom, ({ anchor, location, rotation }) => {
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
