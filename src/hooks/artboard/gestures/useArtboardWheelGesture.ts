import { RenderViewListeners } from 'stores';
import { Vec2 } from 'application/core/units';
import { useSetRecoilState } from 'recoil';
import { ArtboardLocationAtom, ArtboardScaleAtom } from 'stores';
import { getRectZoomLoc } from 'application/utils';
import { useCallback } from 'react';
import { WHEEL_CLOSE_UP_DEGREES } from 'consts';
import { ArtboardTransFixedAnchorSelector } from 'stores/artboard/anchor/ArtboardTransFixedAnchorSelector';



const useArtboardWheelGesture = () => {

    const setArtboardLocation = useSetRecoilState(ArtboardLocationAtom);
    const setArtboardScale = useSetRecoilState(ArtboardScaleAtom);
    const setArtboardAnchorTransformFixed = useSetRecoilState(ArtboardTransFixedAnchorSelector)

    const onWheel: RenderViewListeners['onWheel'] = ({ delta, event }) => {
        event.preventDefault()

        setArtboardAnchorTransformFixed([0.9,.9]);

        /**
        const zoom = delta[1] === 0
            ? 1
            : (delta[1] < 0 ? 1 + WHEEL_CLOSE_UP_DEGREES : 1 - WHEEL_CLOSE_UP_DEGREES);

        setArtboardLocation((currentLoc) =>
            getRectZoomLoc(
                new Vec2(currentLoc),
                zoom,
                new Vec2(event.offsetX, event.offsetY)
            ).toArray()
        );
        setArtboardScale((currentSize) => new Vec2(currentSize).times(zoom).toArray());
         */
    }

    return {
        onWheel: useCallback(onWheel, []),
    }
}

export { useArtboardWheelGesture };