import { RenderViewListeners } from 'dataflow';
import { Vec2 } from 'application/core/units';
import { artboardTransformAtom } from 'dataflow';
import { useSetRecoilState } from 'recoil';

const useRenderViewMouseGesture = () => {
    const setArtboardTransform = useSetRecoilState(artboardTransformAtom);

    let PinchPreviousOffset = new Vec2(0, 0);

    const onMove: RenderViewListeners['onMove'] = ({ event, offset, down }) => {
        event.preventDefault();
        if (event.buttons === 4) {
            setArtboardTransform(({ location, ...param }) => {
                return {
                    ...param,
                    location: new Vec2(location).add(new Vec2(offset)).sub(PinchPreviousOffset).toArray()
                }
            })
        }
        PinchPreviousOffset = new Vec2(offset);
    }

    return { onMove }
}
export { useRenderViewMouseGesture }