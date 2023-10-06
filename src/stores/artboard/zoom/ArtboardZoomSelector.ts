import { selector } from "recoil";
import { Vec2 } from "application/core/units";
import { ArtboardScaleAtom } from '../scale/ArtboardScaleAtom';
import { SelectorKeyes } from "stores/recoilKeys";
import { RenderViewScaleAtom } from "stores/renderview";

const ArtbordZoomSelector = selector<number>({
    key: SelectorKeyes.ARTBORD_ZOOM_SELECTOR,
    get: ({ get }) => {
        const widthZoom = get(ArtboardScaleAtom)[0] / get(RenderViewScaleAtom)[0]
        const heightZoom = get(ArtboardScaleAtom)[1] / get(RenderViewScaleAtom)[1]

        return Math.max(widthZoom, heightZoom)
    },
    set: ({ set, get }, newValue) => {

        if (typeof newValue === 'number') {
            const newScale = new Vec2(get(RenderViewScaleAtom)).times(newValue).toArray()

            set(ArtboardScaleAtom, newScale);
        }

    }
})

export { ArtbordZoomSelector }